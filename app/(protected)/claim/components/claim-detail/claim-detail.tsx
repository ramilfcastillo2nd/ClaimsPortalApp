'use client';

import Link from 'next/link';
import { BadgeInfo, ShoppingCart, Star } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useStoreClient } from '@/app/(protected)/store-client/components/context';
  
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

export function ClaimDetail({ id, zohoDealID, claimReference, stage, vendorName, agreementNumber, vehicleRegistration, agreementStartDate, agreementEndDate, brokerName, queryReason, vendorReference, ownerName, ownerId, ownerEmail, dealName, make }: IClaimDetailProps) {
  const { showCartSheet, showProductDetailsSheet } = useStoreClient();

  return (
    <Card>
      <CardContent className="flex items-center flex-wrap justify-between p-2 pe-5 gap-4.5">
        <div className="flex items-center gap-3.5">
          {/* <Card className="flex items-center justify-center bg-accent/50 h-[70px] w-[90px] shadow-none">
            <img
              src={toAbsoluteUrl(`/media/store/client/600x600/${logo}`)}
              className="h-[70px] cursor-pointer"
              onClick={() => showProductDetailsSheet('productid')}
              alt="image"
            />
          </Card> */}

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5 -mt-1">
              <Link
                href="#"
                className="hover:text-primary text-sm font-medium text-mono leading-5.5"
                onClick={() => showProductDetailsSheet('productid')}
              >
                {dealName}
              </Link>

              {/* {badge && (
                <Badge size="sm" variant="destructive" className="uppercase">
                  save {badgeLabel}%
                </Badge>
              )} */}
            </div>

            <div className="flex items-center flex-wrap gap-3">
              <Badge
                size="sm"
                variant="warning"
                shape="circle"
                className="rounded-full gap-1"
              >
                {zohoDealID}
              </Badge>

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
          <Button
            variant="outline"
            className="ms-2 shrink-0"
            onClick={showCartSheet}
          >
            <BadgeInfo /> View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
