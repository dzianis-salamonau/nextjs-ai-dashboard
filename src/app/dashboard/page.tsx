import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { activityFeed, analyticsOverview } from "@/lib/demo-data";

export const metadata = {
  title: "Overview",
};

export default function DashboardOverviewPage() {
  const { revenue, users, sessions, conversion } = analyticsOverview;

  return (
    <>
      <DashboardHeader
        title="Overview"
        description="Welcome back — here's what's happening today."
      >
        <Button asChild>
          <Link href="/dashboard/chat">
            Open AI chat
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </DashboardHeader>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title={revenue.label}
            value={`$${revenue.value.toLocaleString()}`}
            change={revenue.change}
          />
          <StatCard
            title={users.label}
            value={users.value.toLocaleString()}
            change={users.change}
          />
          <StatCard
            title={sessions.label}
            value={sessions.value.toLocaleString()}
            change={sessions.change}
          />
          <StatCard
            title={conversion.label}
            value={`${conversion.value}%`}
            change={conversion.change}
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <Card className="border-border/60 bg-card/50">
            <CardHeader>
              <CardTitle className="text-base">Recent activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activityFeed.map((item) => (
                <div key={item.id} className="flex gap-3 text-sm">
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p>
                      <span className="font-medium">{item.user}</span>{" "}
                      <span className="text-muted-foreground">{item.action}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
