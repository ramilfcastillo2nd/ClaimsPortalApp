'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BadgeInfo } from 'lucide-react';
import { ApiClient } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useStoreClient } from '@/app/(protected)/store-client/components/context';
import { ClaimDetailsEdit } from '../claim-details-edit/claim-details-edit';

interface IClaimDetailProps {
  id: number;
  zohoDealID: number;
  claimReference: string;
  stage: string;
  vendorName: string;
  agreementNumber: string;
  vehicleRegistration: string;
  agreementStartDate: string;
  agreementEndDate: string;
  brokerName: string;
  queryReason: string;
  vendorReference: string;
  ownerName: string;
  ownerId: string;
  ownerEmail: string;
  dealName: string;
  make: string;
}

export function ClaimDetail({
  id,
  claimReference,
  stage,
  vendorName,
  agreementNumber,
  vehicleRegistration,
  queryReason,
  ownerName,
  ownerEmail,
  dealName,
}: IClaimDetailProps) {
  //const { showProductDetailsSheet } = useStoreClient();
  const [open, setOpen] = useState(false);
  const [claimsInfo, setClaimsInfo] = useState<any>(null);
  const onChange = (next: any) => {
    setClaimsInfo(next);
  };

  const saveChanges = () => {
    ApiClient.updateClaim(id, claimsInfo)
      .then(() => {
        console.log('Claim updated successfully');
      })
      .catch((err) => {
        console.error('Update claim failed', {
          status: err?.response?.status,
          data: err?.response?.data,
        });
      });
  };

  return (
    <Card>
      <CardContent className="flex items-center flex-wrap justify-between p-2 pe-5 gap-4.5">
        <div className="flex items-center gap-3.5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5 -mt-1">
              <Link
                href="#"
                className="hover:text-primary text-sm font-medium text-mono leading-5.5"
                onClick={() => setOpen(true)}
              >
                {dealName}
              </Link>
            </div>

            <div className="flex items-center flex-wrap gap-3">
              <div className="flex items-center flex-wrap gap-2 lg:gap-4">
                <span className="text-xs font-normal text-secondary-foreground">
                  Agreement Number:{' '}
                  <span className="text-xs font-medium text-foreground">
                    {agreementNumber}
                  </span>
                </span>
                <span className="text-xs font-normal text-secondary-foreground">
                  Claim Reference:{' '}
                  <span className="text-xs font-medium text-foreground">
                    {claimReference}
                  </span>
                </span>
                <span className="text-xs font-normal text-secondary-foreground">
                  Stage:{' '}
                  <span className="text-xs font-medium text-foreground">
                    {stage}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="ms-2 shrink-0">
                <BadgeInfo /> View Details
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="!max-w-none sm:!max-w-none w-screen sm:w-[900px] md:w-[1100px] lg:w-[1280px] 2xl:w-[1400px] h-full overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle>Claim Details</SheetTitle>
                <SheetDescription>
                  Quick overview of the claim details
                </SheetDescription>
              </SheetHeader>

              <ClaimDetailsEdit id={id} onChange={onChange} />

              <div className="mt-3 flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => saveChanges()}>Save Changes</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </CardContent>
    </Card>
  );
}
