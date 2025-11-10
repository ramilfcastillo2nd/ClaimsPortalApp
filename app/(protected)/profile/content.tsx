'use client';

import { useEffect, useState } from 'react';
import { ApiClient } from '@/lib/auth';
import { useAuthStore } from '@/lib/state/auth-store';
import { Button } from '@/components/ui/button';
import { PersonalInfo } from './components';
import { AddressInfo } from './components/address-info';
import PreviousAddress from './components/previous-address';
import { ICustomerInfo } from '@/types/customerinfo';
import { IPreviousAddress } from '@/types/previousaddress';
import { RecentUploads } from '../public-profile/profiles/default/components';
import { ApiResponse } from '@/types/auth';

export function AccountUserProfileContent() {
  const loginResponse = useAuthStore((s) => s.loginResponse);
  const [personalInfo, setPersonalInfo] = useState<any | null>(null);
  const [previousAddresses, setPreviousAddresses] = useState<any | null>([]);
  useEffect(() => {
    loadCustomerInfo();
  }, []);

  const loadPreviousAddresses = (id: any) => {
       ApiClient.getPreviousAddressesByCustomerId(id || '')
      .then((res) => {
        console.log('res previous', res);
        setPreviousAddresses(res);
      })
      .catch((err) => {
        console.error('Load previous addresses failed', {
          status: err?.response?.status,
          data: err?.response?.data,
        });
      })
      .finally(() => {
      });
  };

  const loadCustomerInfo = () => {  
    ApiClient.getCustomerByAppuserId(loginResponse?.id || '')
      .then((res) => {
        console.log('customer info res', res.data);
        setPersonalInfo(res);
        loadPreviousAddresses(res?.id);
      })
      .catch((err) => {
        console.error('Load profile failed', {
          status: err?.response?.status,
          data: err?.response?.data,
        });
      })
      .finally(() => {
      });
  };

  const saveChanges = () => {
    updateProfileInfo();
    updatePreviousAddress();
  };

  const updateProfileInfo =() => {
    ApiClient.updateCustomerByAppuserId(loginResponse?.id || '', personalInfo)
      .then(() => {
        console.log('Profile updated successfully');
      })
      .catch((err) => {
        console.error('Update profile failed', {
          status: err?.response?.status,
          data: err?.response?.data,
        });
      });
  };

  const updatePreviousAddress =() => {
    ApiClient.updatePreviousAddress(personalInfo.id, previousAddresses)
      .then(() => {
        console.log('Previous address updated successfully');
      })
      .catch((err) => {
        console.error('Update previous address failed', {
          status: err?.response?.status,
          data: err?.response?.data,
        });
      });
  };

  const onChangePersonalInfo = (next: any) => {
    setPersonalInfo(next);
  };

  const onChangePreviousAddresses = (next: any) => {
    setPreviousAddresses(next);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-7.5">
      <div className="col-span-1">
        <div className="grid gap-5 lg:gap-12">
          <PersonalInfo info={personalInfo} onChangePersonalInfo={onChangePersonalInfo} />
        </div>
      </div>
      <div className="col-span-1">
        <div className="grid gap-5 lg:gap-7.5">
          <PreviousAddress previousAddresses={previousAddresses} onChangePreviousAddresses={onChangePreviousAddresses} />
        </div>
      </div>
      <div className="col-span-1">
        <div className="grid gap-5 lg:gap-7.5">
          <AddressInfo info={personalInfo} onChangePersonalInfo={onChangePersonalInfo} />
        </div>
      </div>
      
      <div className="col-span-1">
        <RecentUploads title="My Files" />
      </div>
      <div className="col-span-1 xl:col-span-2">
        <div className="flex justify-end">
          <Button onClick={saveChanges}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
