import { DashboardHeader } from "@/components/dashboard/header";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { analyticsOverview, revenueChart } from "@/lib/demo-data";

export const metadata = {
  title: "Analytics",
};

export default function AnalyticsPage() {
  const { revenue, users, sessions, conversion } = analyticsOverview;
  const topMonth = revenueChart.reduce((a, b) =>
    b.revenue > a.revenue ? b : a
  );

  return (
    <>
      <DashboardHeader
        title="Analytics"
        description="Deep dive into revenue, users, and growth metrics."
      />
      <div className="flex-1 overflow-y-auto p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
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
            <RevenueChart />
          </TabsContent>

          <TabsContent value="revenue">
            <RevenueChart />
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Peak month: <strong>{topMonth.month}</strong> with{" "}
                  <strong>{topMonth.users.toLocaleString()}</strong> active users.
                  Connect your database to replace demo data.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
