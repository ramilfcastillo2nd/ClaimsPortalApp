'use client';

import { useAuth } from '@/hooks/auth';
export default function ClaimPage() {
  const { user, session, logout, token } = useAuth();

  return (
     <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      {/* <div className="col-span-1">
        <div className="grid gap-5 lg:gap-7.5">
          <RecentUploads title="Recent Uploads" />
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            <MediaUploads />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
            <Contributors />
            <Contributions title="Assistance" />
          </div>
          <Projects />
        </div>
      </div> */}
    </div>
  );
}
