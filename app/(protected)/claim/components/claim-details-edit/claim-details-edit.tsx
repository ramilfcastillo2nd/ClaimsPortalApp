'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Check, SquarePen, X } from 'lucide-react';
import { Input } from 'react-aria-components';
import { ApiClient } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RecentUploads } from '@/app/(protected)/public-profile/profiles/default/components';

export function ClaimDetailsEdit({
  id,
  onChange,
}: {
  id: number;
  onChange?: (next: any) => void;
}) {
  const [localInfo, setLocalInfo] = useState<any>({});
  useEffect(() => {
    console.log('id', 3);
    ApiClient.getClaimById(id).then((data) => {
      console.log('Claim data', data);
      setLocalInfo(data);
      onChange?.(data);
    });
  }, [id]);

  const [editing, setEditing] = useState<
    | null
    | 'claimReference'
    | 'vendorName'
    | 'agreementNumber'
    | 'dealName'
    | 'agreementStartDate'
    | 'agreementEndDate'
    | 'brokerName'
    | 'make'
    | 'vendorReference'
    | 'vehicleRegistration'
    | 'queryReason'
    | 'stage'
  >(null);
  const startEdit = (
    field:
      | 'claimReference'
      | 'vendorName'
      | 'agreementNumber'
      | 'dealName'
      | 'agreementStartDate'
      | 'agreementEndDate'
      | 'brokerName'
      | 'make'
      | 'vendorReference'
      | 'vehicleRegistration'
      | 'queryReason'
      | 'stage'
  ) => setEditing(field);
  const cancelEdit = () => {
    //setLocalInfo(info);
    setEditing(null);
  };
  const saveEdit = () => {
    onChange?.(localInfo);
    setEditing(null);
  };

  // const onChange = (next: any) => {
  //   setLocalInfo(next);
  // };
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 mt-4 text-sm">
      <div className="xl:col-span-8 space-y-3">
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-48 shrink-0 text-muted-foreground">
              Claim Reference
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {editing === 'claimReference' ? (
                <Input
                  className="flex-1 min-w-0 max-w-md"
                  value={localInfo?.claimReference ?? ''}
                  onChange={(e) =>
                    setLocalInfo((prev: any) => ({
                      ...prev,
                      claimReference: (e.target as HTMLInputElement).value,
                    }))
                  }
                  placeholder="Enter claim reference"
                />
              ) : (
                <span className="font-medium truncate">
                  {localInfo?.claimReference ?? '—'}
                </span>
              )}

              {editing === 'claimReference' ? (
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={saveEdit}
                    aria-label="Save"
                  >
                    <Check size={16} className="text-green-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={cancelEdit}
                    aria-label="Cancel"
                  >
                    <X size={16} className="text-red-600" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  mode="icon"
                  onClick={() => startEdit('claimReference')}
                  aria-label="Edit claim reference"
                >
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-48 shrink-0 text-muted-foreground">Vendor Reference</div>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {editing === 'vendorReference' ? (
                <Input
                  className="flex-1 min-w-0 max-w-md"
                  value={localInfo?.vendorReference ?? ''}
                  onChange={(e) =>
                    setLocalInfo((prev: any) => ({
                      ...prev,
                      vendorReference: (e.target as HTMLInputElement).value,
                    }))
                  }
                  placeholder="Enter vendor reference"
                />
              ) : (
                <span className="font-medium truncate">
                  {localInfo?.vendorReference ?? '—'}
                </span>
              )}

              {editing === 'vendorReference' ? (
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={saveEdit}
                    aria-label="Save"
                  >
                    <Check size={16} className="text-green-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={cancelEdit}
                    aria-label="Cancel"
                  >
                    <X size={16} className="text-red-600" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  mode="icon"
                  onClick={() => startEdit('vendorReference')}
                  aria-label="Edit vendor reference"
                >
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-48 shrink-0 text-muted-foreground">
              Vendor Name
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {editing === 'vendorName' ? (
                <Input
                  className="flex-1 min-w-0 max-w-md"
                  value={localInfo?.vendorName ?? ''}
                  onChange={(e) =>
                    setLocalInfo((prev: any) => ({
                      ...prev,
                      vendorName: (e.target as HTMLInputElement).value,
                    }))
                  }
                  placeholder="Enter vendor name"
                />
              ) : (
                <span className="font-medium truncate">
                  {localInfo?.vendorName ?? '—'}
                </span>
              )}

              {editing === 'vendorName' ? (
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={saveEdit}
                    aria-label="Save"
                  >
                    <Check size={16} className="text-green-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={cancelEdit}
                    aria-label="Cancel"
                  >
                    <X size={16} className="text-red-600" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  mode="icon"
                  onClick={() => startEdit('vendorName')}
                  aria-label="Edit vendor name"
                >
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-48 shrink-0 text-muted-foreground">
              Agreement Start Date
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {editing === 'agreementNumber' ? (
                <Input
                  className="flex-1 min-w-0 max-w-md"
                  value={localInfo?.agreementNumber ?? ''}
                  onChange={(e) =>
                    setLocalInfo((prev: any) => ({
                      ...prev,
                      agreementNumber: (e.target as HTMLInputElement).value,
                    }))
                  }
                  placeholder="Enter agreement number"
                />
              ) : (
                <span className="font-medium truncate">
                  {localInfo?.agreementNumber ?? '—'}
                </span>
              )}

              {editing === 'agreementNumber' ? (
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={saveEdit}
                    aria-label="Save"
                  >
                    <Check size={16} className="text-green-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={cancelEdit}
                    aria-label="Cancel"
                  >
                    <X size={16} className="text-red-600" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  mode="icon"
                  onClick={() => startEdit('agreementNumber')}
                  aria-label="Edit agreement number"
                >
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-48 shrink-0 text-muted-foreground">Deal Name</div>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {editing === 'dealName' ? (
                <Input
                  className="flex-1 min-w-0 max-w-md"
                  value={localInfo?.dealName ?? ''}
                  onChange={(e) =>
                    setLocalInfo((prev: any) => ({
                      ...prev,
                      dealName: (e.target as HTMLInputElement).value,
                    }))
                  }
                  placeholder="Enter deal name"
                />
              ) : (
                <span className="font-medium truncate">
                  {localInfo?.dealName ?? '—'}
                </span>
              )}

              {editing === 'dealName' ? (
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={saveEdit}
                    aria-label="Save"
                  >
                    <Check size={16} className="text-green-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={cancelEdit}
                    aria-label="Cancel"
                  >
                    <X size={16} className="text-red-600" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  mode="icon"
                  onClick={() => startEdit('dealName')}
                  aria-label="Edit deal name"
                >
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-48 shrink-0 text-muted-foreground">
              Agreement Start Date
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {editing === 'agreementStartDate' ? (
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-48 justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {localInfo?.agreementStartDate
                          ? format(
                              new Date(localInfo.agreementStartDate),
                              'dd MMM yyyy',
                            )
                          : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          localInfo?.agreementStartDate
                            ? new Date(localInfo.agreementStartDate)
                            : undefined
                        }
                        onSelect={(date) => {
                          if (!date) return;
                          const yyyyMmDd = date.toISOString().slice(0, 10);
                          setLocalInfo((prev: any) => ({
                            ...prev,
                            agreementStartDate: yyyyMmDd,
                          }));
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                <span className="font-medium">
                  {localInfo?.agreementStartDate
                    ? format(
                        new Date(localInfo.agreementStartDate),
                        'dd MMM yyyy',
                      )
                    : '—'}
                </span>
              )}

              {editing === 'agreementStartDate' ? (
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={saveEdit}
                    aria-label="Save"
                  >
                    <Check size={16} className="text-green-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={cancelEdit}
                    aria-label="Cancel"
                  >
                    <X size={16} className="text-red-600" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  mode="icon"
                  onClick={() => startEdit('agreementStartDate')}
                  aria-label="Edit agreement start date"
                >
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-48 shrink-0 text-muted-foreground">
              Agreement End Date
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {editing === 'agreementEndDate' ? (
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-48 justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {localInfo?.agreementEndDate
                          ? format(
                              new Date(localInfo.agreementEndDate),
                              'dd MMM yyyy',
                            )
                          : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          localInfo?.agreementEndDate
                            ? new Date(localInfo.agreementEndDate)
                            : undefined
                        }
                        onSelect={(date) => {
                          if (!date) return;
                          const yyyyMmDd = date.toISOString().slice(0, 10);
                          setLocalInfo((prev: any) => ({
                            ...prev,
                            agreementEndDate: yyyyMmDd,
                          }));
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                <span className="font-medium">
                  {localInfo?.agreementEndDate
                    ? format(
                        new Date(localInfo.agreementEndDate),
                        'dd MMM yyyy',
                      )
                    : '—'}
                </span>
              )}

              {editing === 'agreementEndDate' ? (
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={saveEdit}
                    aria-label="Save"
                  >
                    <Check size={16} className="text-green-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={cancelEdit}
                    aria-label="Cancel"
                  >
                    <X size={16} className="text-red-600" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  mode="icon"
                  onClick={() => startEdit('agreementEndDate')}
                  aria-label="Edit agreement end date"
                >
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-48 shrink-0 text-muted-foreground">
              Broker Name
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {editing === 'brokerName' ? (
                <Input
                  className="flex-1 min-w-0 max-w-md"
                  value={localInfo?.brokerName ?? ''}
                  onChange={(e) =>
                    setLocalInfo((prev: any) => ({
                      ...prev,
                      brokerName: (e.target as HTMLInputElement).value,
                    }))
                  }
                  placeholder="Enter broker name"
                />
              ) : (
                <span className="font-medium truncate">
                  {localInfo?.brokerName ?? '—'}
                </span>
              )}

              {editing === 'brokerName' ? (
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={saveEdit}
                    aria-label="Save"
                  >
                    <Check size={16} className="text-green-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={cancelEdit}
                    aria-label="Cancel"
                  >
                    <X size={16} className="text-red-600" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  mode="icon"
                  onClick={() => startEdit('brokerName')}
                  aria-label="Edit broker name"
                >
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              )}
            </div>
          </div>
         <div className="flex items-center gap-3">
            <div className="w-48 shrink-0 text-muted-foreground">Make</div>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {editing === 'make' ? (
                <Input
                  className="flex-1 min-w-0 max-w-md"
                  value={localInfo?.make ?? ''}
                  onChange={(e) =>
                    setLocalInfo((prev: any) => ({
                      ...prev,
                      make: (e.target as HTMLInputElement).value,
                    }))
                  }
                  placeholder="Enter make"
                />
              ) : (
                <span className="font-medium truncate">
                  {localInfo?.make ?? '—'}
                </span>
              )}

              {editing === 'make' ? (
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={saveEdit}
                    aria-label="Save"
                  >
                    <Check size={16} className="text-green-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={cancelEdit}
                    aria-label="Cancel"
                  >
                    <X size={16} className="text-red-600" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  mode="icon"
                  onClick={() => startEdit('make')}
                  aria-label="Edit make"
                >
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-48 shrink-0 text-muted-foreground">Vehicle Registration</div>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {editing === 'vehicleRegistration' ? (
                <Input
                  className="flex-1 min-w-0 max-w-md"
                  value={localInfo?.vehicleRegistration ?? ''}
                  onChange={(e) =>
                    setLocalInfo((prev: any) => ({
                      ...prev,
                      vehicleRegistration: (e.target as HTMLInputElement).value,
                    }))
                  }
                  placeholder="Enter vehicle registration"
                />
              ) : (
                <span className="font-medium truncate">
                  {localInfo?.vehicleRegistration ?? '—'}
                </span>
              )}

              {editing === 'vehicleRegistration' ? (
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={saveEdit}
                    aria-label="Save"
                  >
                    <Check size={16} className="text-green-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={cancelEdit}
                    aria-label="Cancel"
                  >
                    <X size={16} className="text-red-600" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  mode="icon"
                  onClick={() => startEdit('vehicleRegistration')}
                  aria-label="Edit vehicle registration"
                >
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-48 shrink-0 text-muted-foreground">Query Reason</div>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {editing === 'queryReason' ? (
                <Input
                  className="flex-1 min-w-0 max-w-md"
                  value={localInfo?.queryReason ?? ''}
                  onChange={(e) =>
                    setLocalInfo((prev: any) => ({
                      ...prev,
                      queryReason: (e.target as HTMLInputElement).value,
                    }))
                  }
                  placeholder="Enter query reason"
                />
              ) : (
                <span className="font-medium truncate">
                  {localInfo?.queryReason ?? '—'}
                </span>
              )}

              {editing === 'queryReason' ? (
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={saveEdit}
                    aria-label="Save"
                  >
                    <Check size={16} className="text-green-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={cancelEdit}
                    aria-label="Cancel"
                  >
                    <X size={16} className="text-red-600" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  mode="icon"
                  onClick={() => startEdit('queryReason')}
                  aria-label="Edit query reason"
                >
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-48 shrink-0 text-muted-foreground">Stage</div>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {editing === 'stage' ? (
                <Input
                  className="flex-1 min-w-0 max-w-md"
                  value={localInfo?.stage ?? ''}
                  onChange={(e) =>
                    setLocalInfo((prev: any) => ({
                      ...prev,
                      stage: (e.target as HTMLInputElement).value,
                    }))
                  }
                  placeholder="Enter stage"
                />
              ) : (
                <span className="font-medium truncate">
                  {localInfo?.stage ?? '—'}
                </span>
              )}

              {editing === 'stage' ? (
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={saveEdit}
                    aria-label="Save"
                  >
                    <Check size={16} className="text-green-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    mode="icon"
                    onClick={cancelEdit}
                    aria-label="Cancel"
                  >
                    <X size={16} className="text-red-600" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  mode="icon"
                  onClick={() => startEdit('stage')}
                  aria-label="Edit stage"
                >
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="xl:col-span-4">
        <RecentUploads title="My Files" />
      </div>
    </div>
  );
}
