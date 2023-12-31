import SubscriptionCard from "@/Components/SubscriptionCard";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Inertia } from "@inertiajs/inertia";
import { Head, router } from "@inertiajs/react";

export default function SubscriptionPlan({ auth, subscriptionPlans, env }) {
    const selectSubscription = (id) => {
        router.post(
            route("user.dashboard.subscriptionPlan.userSubscribe", {
                subscriptionPlan: id,
            }),
            {},
            {
                only: ["userSubscription"],
                onSuccess: ({ props }) => {
                    onSnapMidtrans(props.userSubscription);
                },
            }
        );
    };

    const onSnapMidtrans = (userSubscription) => {
        snap.pay(userSubscription.snap_token, {
            onSuccess: function (result) {
                router.visit(route("user.dashboard.index"));
            },
            // Optional
            onPending: function (result) {},
            // Optional
            onError: function (result) {},
        });
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Subscription Plan">
                <script
                    src={`${env.MIDTRANS_ENDPOINT}/snap/snap.js`}
                    data-client-key={env.MIDTRANS_CLIENT_KEY}
                ></script>
            </Head>
            <div className="py-20 flex flex-col items-center">
                <div className="text-black font-semibold text-[26px] mb-3">
                    Pricing for Everyone
                </div>
                <p className="text-base text-gray-1 leading-7 max-w-[302px] text-center">
                    Invest your little money to get a whole new experiences from
                    movies.
                </p>

                {/* Pricing Card */}
                <div className="flex justify-center gap-10 mt-[70px]">
                    {subscriptionPlans.map((subscriptionPlan) => (
                        <SubscriptionCard
                            key={subscriptionPlan.id}
                            name={subscriptionPlan.name}
                            price={subscriptionPlan.price}
                            durationInMonth={
                                subscriptionPlan.active_period_in_month
                            }
                            isPremium={subscriptionPlan.name === "Premium"}
                            features={JSON.parse(subscriptionPlan.features)}
                            onSelectSubscription={() =>
                                selectSubscription(subscriptionPlan.id)
                            }
                        />
                    ))}
                </div>
                {/* Pricing Card */}
            </div>
        </Authenticated>
    );
}
