'use client';

import { useEffect, useState } from 'react';
import { Funnel, Search as SearchIcon } from 'lucide-react';
import { ApiClient } from '@/lib/auth/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StoreClientFiltersSheet } from '@/app/(protected)/store-client/components/sheets/filters-sheet';
import { ClaimDetail } from '../claim-detail/claim-detail';

interface IClaimListGridContentItem {
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

type SearchResultsType = 'card' | 'list';

export function ClaimList() {
  const [searchInput, setSearchInput] = useState('');
  const [activePeriod, setActivePeriod] = useState('Week');
  // const [activeTab, setActiveTab] = useState<SearchResultsType>(mode);
  const [activeTab, setActiveTab] = useState<SearchResultsType>('list');
  const [claimItems, setClaimItems] = useState<IClaimListGridContentItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    // Helper to normalize payload
    const toArray = (data: any) =>
      data?.items ?? data?.data?.items ?? data?.data ?? data;

    const toClaim = (raw: any): IClaimListGridContentItem => ({
      id: Number(raw.id ?? raw.claimId ?? 0),
      zohoDealID: Number(raw.zohoDealID ?? raw.zohoDealId ?? 0),
      claimReference: String(raw.claimReference ?? raw.reference ?? ''),
      stage: String(raw.stage ?? raw.status ?? ''),
      vendorName: String(raw.vendorName ?? raw.vendor?.name ?? ''),
      agreementNumber: String(
        raw.agreementNumber ?? raw.agreement?.number ?? '',
      ),
      vehicleRegistration: String(
        raw.vehicleRegistration ??
          raw.vehicleReg ??
          raw.vehicle?.registration ??
          '',
      ),
      agreementStartDate: String(
        raw.agreementStartDate ?? raw.agreement?.startDate ?? '',
      ),
      agreementEndDate: String(
        raw.agreementEndDate ?? raw.agreement?.endDate ?? '',
      ),
      brokerName: String(raw.brokerName ?? raw.broker?.name ?? ''),
      queryReason: String(raw.queryReason ?? ''),
      vendorReference: String(raw.vendorReference ?? ''),
      ownerName: String(raw.ownerName ?? raw.owner?.name ?? ''),
      ownerId: String(raw.ownerId ?? raw.owner?.id ?? ''),
      ownerEmail: String(raw.ownerEmail ?? raw.owner?.email ?? ''),
      dealName: String(raw.dealName ?? raw.deal?.name ?? ''),
      make: String(raw.make ?? raw.vehicle?.make ?? ''),
    });

    // Use '/claim' if your Next route is app/api/claim/route.ts
    ApiClient.get('/claims')
      .then((res) => {
        if (cancelled) return;

        console.log('GET /api/claim raw:', res);

        const rawList = toArray(res);
        const list = Array.isArray(rawList) ? rawList : [];

        const mapped = list.map(toClaim);

        // Log the value you’re about to set (not the old state)
        console.log('mapped claims:', mapped);

        setClaimItems(mapped);
      })
      .catch((err) => {
        console.error('Load claims failed', {
          status: err?.response?.status,
          data: err?.response?.data,
        });
        setClaimItems([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Log AFTER state updates
  useEffect(() => {
    console.log('claim items (state):', claimItems);
  }, [claimItems]);

  const renderItem = (item: IClaimListGridContentItem, index: number) => {
    return <ClaimDetail key={index} {...item} />;
    // return activeTab === 'card' ? (
    //   <Card2 key={index} {...props} />
    // ) : (
    //   <Card3 key={index} {...props} />
    // );
  };

  return (
    <div className="flex flex-col items-stretch gap-7">
      <div className="flex items-center gap-3 w-full">
        <div className="relative flex items-center w-full mx-auto  z-1">
          <SearchIcon
            className="absolute start-4 text-muted-foreground"
            size={16}
          />

          <Input
            id="search-input"
            value={searchInput}
            placeholder="Seach a claim"
            onChange={(e) => setSearchInput(e.target.value)}
            className="ps-9 pe-10 w-full"
          />

          <Badge className="absolute end-2 gap-1" appearance="light" size="sm">
            ⌘ K
          </Badge>
        </div>

        <StoreClientFiltersSheet
          trigger={
            <Button>
              <Funnel /> Filter
            </Button>
          }
        />
      </div>

      <div className="flex flex-wrap items-center gap-5 justify-between mt-3">
        <h3 className="text-sm text-mono font-medium">
          1 - {claimItems ? claimItems.length : 0} over 280 results for 
          <span className="text-destructive">{' ' + searchInput}</span>
        </h3>

        <div className="flex items-center gap-2.5"></div>
      </div>

      <div
        className={
          activeTab === 'card'
            ? 'grid sm:grid-cols-4 gap-5 mb-2'
            : 'grid grid-cols-1 gap-5'
        }
      >
        {claimItems &&
          claimItems.map((item, index) => {
            return renderItem(item, index);
          })}
      </div>
    </div>
  );
}
