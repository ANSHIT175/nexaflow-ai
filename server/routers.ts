import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import Stripe from "stripe";
import { z } from "zod";
import { getPriceInCents, getProductByName } from "./products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Stripe payment procedures
  payment: router({
    createCheckoutSession: protectedProcedure
      .input(
        z.object({
          planName: z.enum(["Starter", "Professional", "Enterprise"]),
          currency: z.enum(["USD", "INR", "EUR"]),
          billingPeriod: z.enum(["monthly", "annual"]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        try {
          const productKey = getProductByName(input.planName);
          if (!productKey) {
            throw new Error("Invalid plan name");
          }

          const basePrice = getPriceInCents(productKey, input.currency);
          const price = input.billingPeriod === "annual" ? Math.round(basePrice * 12 * 0.8) : basePrice;

          const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
              {
                price_data: {
                  currency: input.currency.toLowerCase(),
                  product_data: {
                    name: `${input.planName} Plan - ${input.billingPeriod === "annual" ? "Annual" : "Monthly"}`,
                    description: `NexaFlow ${input.planName} Plan`,
                  },
                  unit_amount: price,
                  recurring: {
                    interval: input.billingPeriod === "annual" ? "year" : "month",
                    interval_count: 1,
                  },
                },
                quantity: 1,
              },
            ],
            mode: "subscription",
            success_url: `${ctx.req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${ctx.req.headers.origin}/pricing`,
            customer_email: ctx.user.email || undefined,
            client_reference_id: ctx.user.id.toString(),
            metadata: {
              user_id: ctx.user.id.toString(),
              customer_email: ctx.user.email || "",
              customer_name: ctx.user.name || "",
              plan: input.planName,
              billing_period: input.billingPeriod,
            },
            allow_promotion_codes: true,
          });

          return {
            sessionId: session.id,
            url: session.url,
          };
        } catch (error) {
          console.error("Stripe checkout error:", error);
          throw error;
        }
      }),

    getCheckoutSession: protectedProcedure
      .input(z.object({ sessionId: z.string() }))
      .query(async ({ input }) => {
        try {
          const session = await stripe.checkout.sessions.retrieve(input.sessionId);
          return {
            id: session.id,
            status: session.status,
            payment_status: session.payment_status,
            customer_email: session.customer_email,
            subscription: session.subscription,
          };
        } catch (error) {
          console.error("Stripe session retrieval error:", error);
          throw error;
        }
      }),

    getPaymentHistory: protectedProcedure.query(async ({ ctx }) => {
      try {
        // Get all invoices for this user's email
        const invoices = await stripe.invoices.list({
          customer: ctx.user.email || undefined,
          limit: 10,
        });

        return invoices.data.map((invoice: any) => ({
          id: invoice.id,
          date: new Date(invoice.created * 1000),
          amount: invoice.amount_paid,
          currency: invoice.currency?.toUpperCase(),
          status: invoice.status,
          paid: invoice.paid,
        }));
      } catch (error) {
        console.error("Payment history error:", error);
        return [];
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
