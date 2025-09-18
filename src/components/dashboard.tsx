'use client';
import { motion } from 'framer-motion';
import { Card } from './card';
import {
  AiOutlineFileText,
  AiOutlineUser,
} from 'react-icons/ai';
import { TfiStatsUp } from 'react-icons/tfi';
import { BsBarChartLine } from 'react-icons/bs';
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: string;
  delay: number;
}

function StatCard({ title, value, icon: Icon, trend, delay }: StatCardProps) {
  return (
    <Card variant="stat" animate delay={delay}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-accent font-medium">{trend}</p>
        </div>
        <div className="p-3 bg-primary/10 rounded-full">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Posts',
      value: '100',
      icon: AiOutlineFileText,
      trend: '+12% from last month',
      delay: 0,
    },
    {
      title: 'Active Users',
      value: '10',
      icon: AiOutlineUser,
      trend: '+5% from last month',
      delay: 0.1,
    },
    {
      title: 'Engagement Rate',
      value: '94.2%',
      icon: TfiStatsUp,
      trend: '+2.1% from last week',
      delay: 0.2,
    },
    {
      title: 'Total Views',
      value: '24.5K',
      icon: BsBarChartLine,
      trend: '+18% from last month',
      delay: 0.3,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-hero rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Zettabyte Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Monitor your posts, users, and performance metrics in real-time
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.a
              href="/posts"
              className="p-4 bg-primary/10 rounded-lg text-center hover:bg-primary/20 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AiOutlineFileText className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="font-medium text-foreground">View Posts</p>
            </motion.a>

            <motion.a
              href="/users"
              className="p-4 bg-accent/10 rounded-lg text-center hover:bg-accent/20 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AiOutlineUser className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="font-medium text-foreground">Manage Users</p>
            </motion.a>

            <motion.div
              className="p-4 bg-warning/10 rounded-lg text-center hover:bg-warning/20 transition-colors duration-200 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BsBarChartLine className="h-8 w-8 text-warning mx-auto mb-2" />
              <p className="font-medium text-foreground">Analytics</p>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
