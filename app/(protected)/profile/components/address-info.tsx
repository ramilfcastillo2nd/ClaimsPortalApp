'use client';

import { useEffect, useState } from 'react';
import { Check, SquarePen, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

const AddressInfo = ({
  info,
  onChangePersonalInfo,
}: {
  info: any;
  onChangePersonalInfo?: (next: any) => void;
}) => {
  const [localInfo, setLocalInfo] = useState<any>(info);
  const [editing, setEditing] = useState<
    | null
    | 'streetName'
    | 'streetName2'
    | 'town'
    | 'city'
    | 'county'
    | 'postcode'
  >(null);
  useEffect(() => {
    setLocalInfo(info);
  }, [info]);

  const startEdit = (
    field:
      | 'streetName'
      | 'streetName2'
      | 'town'
      | 'city'
      | 'county'
      | 'postcode',
  ) => setEditing(field);
  const cancelEdit = () => {
    setLocalInfo(info);
    setEditing(null);
  };
  const saveEdit = () => {
    onChangePersonalInfo?.(localInfo);
    setEditing(null);
  };

  return (
    <Card className="min-w-full">
      <CardHeader>
        <CardTitle>Address Information</CardTitle>
      </CardHeader>
      <CardContent className="kt-scrollable-x-auto pb-3 p-0">
        <Table className="align-middle text-sm text-muted-foreground">
          <TableBody>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                Street Name
              </TableCell>
              <TableCell className="py-2 text-foreground font-normaltext-sm">
                {editing === 'streetName' ? (
                  <div className="flex items-center gap-2">
                    <Input
                      className="w-64"
                      value={localInfo?.streetName ?? ''}
                      onChange={(e) =>
                        setLocalInfo((prev: any) => ({
                          ...prev,
                          streetName: e.target.value,
                        }))
                      }
                      placeholder="Enter street name"
                    />
                  </div>
                ) : (
                  localInfo?.streetName
                )}
              </TableCell>
              <TableCell className="py-2 text-center">
                {editing === 'streetName' ? (
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
                    onClick={() => startEdit('streetName')}
                    aria-label="Edit street name"
                  >
                    <SquarePen size={16} className="text-blue-500" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                Street Name 2
              </TableCell>
              <TableCell className="py-2 text-foreground font-normaltext-sm">
                {editing === 'streetName2' ? (
                  <div className="flex items-center gap-2">
                    <Input
                      className="w-64"
                      value={localInfo?.streetName2 ?? ''}
                      onChange={(e) =>
                        setLocalInfo((prev: any) => ({
                          ...prev,
                          streetName2: e.target.value,
                        }))
                      }
                      placeholder="Enter street name 2"
                    />
                  </div>
                ) : (
                  localInfo?.streetName2
                )}
              </TableCell>
              <TableCell className="py-2 text-center">
                {editing === 'streetName2' ? (
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
                    onClick={() => startEdit('streetName2')}
                    aria-label="Edit street name 2"
                  >
                    <SquarePen size={16} className="text-blue-500" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                Town
              </TableCell>
              <TableCell className="py-2 text-foreground font-normaltext-sm">
                {editing === 'town' ? (
                  <div className="flex items-center gap-2">
                    <Input
                      className="w-64"
                      value={localInfo?.town ?? ''}
                      onChange={(e) =>
                        setLocalInfo((prev: any) => ({
                          ...prev,
                          town: e.target.value,
                        }))
                      }
                      placeholder="Enter town"
                    />
                  </div>
                ) : (
                  localInfo?.town
                )}
              </TableCell>
              <TableCell className="py-2 text-center">
                {editing === 'town' ? (
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
                    onClick={() => startEdit('town')}
                    aria-label="Edit town"
                  >
                    <SquarePen size={16} className="text-blue-500" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                City
              </TableCell>
              <TableCell className="py-2 text-foreground font-normaltext-sm">
                {editing === 'city' ? (
                  <div className="flex items-center gap-2">
                    <Input
                      className="w-64"
                      value={localInfo?.city ?? ''}
                      onChange={(e) =>
                        setLocalInfo((prev: any) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                      placeholder="Enter city"
                    />
                  </div>
                ) : (
                  localInfo?.city
                )}
              </TableCell>
              <TableCell className="py-2 text-center">
                {editing === 'city' ? (
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
                    onClick={() => startEdit('city')}
                    aria-label="Edit city"
                  >
                    <SquarePen size={16} className="text-blue-500" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                County
              </TableCell>
              <TableCell className="py-2 text-foreground font-normaltext-sm">
                {editing === 'county' ? (
                  <div className="flex items-center gap-2">
                    <Input
                      className="w-64"
                      value={localInfo?.county ?? ''}
                      onChange={(e) =>
                        setLocalInfo((prev: any) => ({
                          ...prev,
                          county: e.target.value,
                        }))
                      }
                      placeholder="Enter county"
                    />
                  </div>
                ) : (
                  localInfo?.county
                )}
              </TableCell>
              <TableCell className="py-2 text-center">
                {editing === 'county' ? (
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
                    onClick={() => startEdit('county')}
                    aria-label="Edit county"
                  >
                    <SquarePen size={16} className="text-blue-500" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                Post Code
              </TableCell>
              <TableCell className="py-2 text-foreground font-normaltext-sm">
                {editing === 'postcode' ? (
                  <div className="flex items-center gap-2">
                    <Input
                      className="w-64"
                      value={localInfo?.postcode ?? ''}
                      onChange={(e) =>
                        setLocalInfo((prev: any) => ({
                          ...prev,
                          postcode: e.target.value,
                        }))
                      }
                      placeholder="Enter post code"
                    />
                  </div>
                ) : (
                  localInfo?.postcode
                )}
              </TableCell>
              <TableCell className="py-2 text-center">
                {editing === 'postcode' ? (
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
                    onClick={() => startEdit('postcode')}
                    aria-label="Edit post code"
                  >
                    <SquarePen size={16} className="text-blue-500" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export { AddressInfo };
