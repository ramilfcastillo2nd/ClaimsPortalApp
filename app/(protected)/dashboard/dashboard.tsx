'use client';

import { useAuth } from '@/hooks/auth';
import { CommunityBadges } from '../account/home/user-profile/components';
import { About, Contributions, Contributors, MediaUploads, Projects, RecentUploads, Tags, UnlockPartnerships, WorkExperience } from '../public-profile/profiles/default/components';

export default function DashboardPage() {
  const { user, session, logout, token } = useAuth();

  return (
     <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-1">
        <div className="grid gap-5 lg:gap-7.5">
          {/* <CommunityBadges title="Community Badges" /> */}
          <About />
          <WorkExperience />
          <Tags title="Skills" />
          <RecentUploads title="Recent Uploads" />
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            {/* <UnlockPartnerships /> */}
            <MediaUploads />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
            <Contributors />
            <Contributions title="Assistance" />
          </div>
          <Projects />
        </div>
      </div>
    </div>
    // <AppAuthGuard>
      // <div className="container mx-auto py-8">
      //   <div className="flex justify-between items-center mb-6">
      //     <h1 className="text-3xl font-bold">Dashboard</h1>
      //     <Button onClick={() => logout()} variant="outline">
      //       Sign Out
      //     </Button>
      //   </div>

      //   <div className="bg-white p-6 rounded-lg shadow">
      //     <h2 className="text-xl font-semibold mb-4">Welcome back!</h2>
      //     <div className="space-y-2">
      //       <p className="text-gray-600">Email: {user?.email}</p>
      //       <p className="text-gray-600">Name: {user?.name}</p>
      //       {token && (
      //         <p className="text-green-600 text-sm">
      //           ✓ Authenticated with stored token
      //         </p>
      //       )}
      //     </div>
      //   </div>
      // </div>
    // </AppAuthGuard>
  );
}
