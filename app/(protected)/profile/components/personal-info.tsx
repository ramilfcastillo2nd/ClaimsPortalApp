'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Check, SquarePen, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

const PersonalInfo = ({
  info,
  onChange,
}: {
  info: any;
  onChange?: (next: any) => void;
}) => {
  const [localInfo, setLocalInfo] = useState<any>(info);
  const [editing, setEditing] = useState<
    | null
    | 'status'
    | 'customerReference'
    | 'title'
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'mobile'
    | 'dateOfBirth'
    | 'previousName'
  >(null);
  useEffect(() => {
    setLocalInfo(info);
  }, [info]);

  const startEdit = (
    field:
      | 'status'
      | 'customerReference'
      | 'title'
      | 'firstName'
      | 'lastName'
      | 'email'
      | 'mobile'
      | 'dateOfBirth'
      | 'previousName',
  ) => setEditing(field);
  const cancelEdit = () => {
    setLocalInfo(info);
    setEditing(null);
  };
  const saveEdit = () => {
    onChange?.(localInfo);
    setEditing(null);
  };
  return (
    <Card className="min-w-full">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="kt-scrollable-x-auto pb-3 p-0">
        <Table className="align-middle text-sm text-muted-foreground">
          <TableBody>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Status
              </TableCell>

              <TableCell className="py-3 text-foreground font-normal">
                {editing === 'status' ? (
                  <div className="flex items-center gap-2">
                    <Select
                      value={String(localInfo?.status ?? '')}
                      onValueChange={(v) =>
                        setLocalInfo((prev: any) => ({ ...prev, status: v }))
                      }
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  localInfo?.status == "Active" && <Badge size="md" variant="success" appearance="light">
                    {localInfo?.status}
                  </Badge>

                  || localInfo?.status == "Inactive" && <Badge size="md" variant="warning" appearance="light">
                    {localInfo?.status}
                  </Badge>
                )}
              </TableCell>

              <TableCell className="py-3 text-center">
                {editing === 'status' ? (
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
                    onClick={() => startEdit('status')}
                    aria-label="Edit status"
                  >
                    <SquarePen size={16} className="text-blue-500" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                Customer Reference
              </TableCell>
              <TableCell className="py-2 text-foreground font-normaltext-sm">
                {editing === 'customerReference' ? (
                  <div className="flex items-center gap-2">
                    <Input
                      className="w-64"
                      value={localInfo?.customerReference ?? ''}
                      onChange={(e) =>
                        setLocalInfo((prev: any) => ({
                          ...prev,
                          customerReference: e.target.value,
                        }))
                      }
                      placeholder="Enter customer reference"
                    />
                  </div>
                ) : (
                  localInfo?.customerReference
                )}
              </TableCell>
              <TableCell className="py-2 text-center">
                {editing === 'customerReference' ? (
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
                    onClick={() => startEdit('customerReference')}
                    aria-label="Edit customer reference"
                  >
                    <SquarePen size={16} className="text-blue-500" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                Title
              </TableCell>
              <TableCell className="py-2 text-foreground font-normaltext-sm">
                {editing === 'title' ? (
                  <div className="flex items-center gap-2">
                    <Input
                      className="w-64"
                      value={localInfo?.title ?? ''}
                      onChange={(e) =>
                        setLocalInfo((prev: any) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Enter title"
                    />
                  </div>
                ) : (
                  localInfo?.title
                )}
              </TableCell>
              <TableCell className="py-2 text-center">
                {editing === 'title' ? (
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
                    onClick={() => startEdit('title')}
                    aria-label="Edit title"
                  >
                    <SquarePen size={16} className="text-blue-500" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                First Name
              </TableCell>
              <TableCell className="py-2 text-foreground font-normaltext-sm">
                {editing === 'firstName' ? (
                  <div className="flex items-center gap-2">
                    <Input
                      className="w-64"
                      value={localInfo?.firstName ?? ''}
                      onChange={(e) =>
                        setLocalInfo((prev: any) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                      placeholder="Enter first name"
                    />
                  </div>
                ) : (
                  localInfo?.firstName
                )}
              </TableCell>
              <TableCell className="py-2 text-center">
                {editing === 'firstName' ? (
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
                    onClick={() => startEdit('firstName')}
                    aria-label="Edit first name"
                  >
                    <SquarePen size={16} className="text-blue-500" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                Last Name
              </TableCell>
              <TableCell className="py-2 text-foreground font-normaltext-sm">
                {editing === 'lastName' ? (
                  <div className="flex items-center gap-2">
                    <Input
                      className="w-64"
                      value={localInfo?.lastName ?? ''}
                      onChange={(e) =>
                        setLocalInfo((prev: any) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                      placeholder="Enter last name"
                    />
                  </div>
                ) : (
                  localInfo?.lastName
                )}
              </TableCell>
              <TableCell className="py-2 text-center">
                {editing === 'lastName' ? (
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
                    onClick={() => startEdit('lastName')}
                    aria-label="Edit last name"
                  >
                    <SquarePen size={16} className="text-blue-500" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                Email
              </TableCell>
              <TableCell className="py-2 text-foreground font-normaltext-sm">
                {editing === 'email' ? (
                  <div className="flex items-center gap-2">
                    <Input
                      className="w-64"
                      value={localInfo?.email ?? ''}
                      onChange={(e) =>
                        setLocalInfo((prev: any) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="Enter email"
                    />
                  </div>
                ) : (
                  localInfo?.email
                )}
              </TableCell>
              <TableCell className="py-2 text-center">
                {editing === 'email' ? (
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
                    onClick={() => startEdit('email')}
                    aria-label="Edit email"
                  >
                    <SquarePen size={16} className="text-blue-500" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                Mobile Number
              </TableCell>
              <TableCell className="py-2 text-foreground font-normaltext-sm">
                {editing === 'mobile' ? (
                  <div className="flex items-center gap-2">
                    <Input
                      className="w-64"
                      value={localInfo?.mobile ?? ''}
                      onChange={(e) =>
                        setLocalInfo((prev: any) => ({
                          ...prev,
                          mobile: e.target.value,
                        }))
                      }
                      placeholder="Enter mobile number"
                    />
                  </div>
                ) : (
                  localInfo?.mobile
                )}
              </TableCell>
              <TableCell className="py-2 text-center">
                {editing === 'mobile' ? (
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
                    onClick={() => startEdit('mobile')}
                    aria-label="Edit mobile number"
                  >
                    <SquarePen size={16} className="text-blue-500" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Birthday
              </TableCell>
              <TableCell className="py-3 text-foreground font-normal">
                {editing === 'dateOfBirth' ? (
                  <div className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-48 justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {localInfo?.dateOfBirth
                            ? format(
                                new Date(localInfo.dateOfBirth),
                                'dd MMM yyyy',
                              )
                            : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            localInfo?.dateOfBirth
                              ? new Date(localInfo.dateOfBirth)
                              : undefined
                          }
                          onSelect={(date) => {
                            if (!date) return;
                            // store as YYYY-MM-DD (or use toISOString if you prefer)
                            const yyyyMmDd = date.toISOString().slice(0, 10);
                            setLocalInfo((prev: any) => ({
                              ...prev,
                              dateOfBirth: yyyyMmDd,
                            }));
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                ) : (
                  <span className="text-sm">
                    {localInfo?.dateOfBirth
                      ? format(new Date(localInfo.dateOfBirth), 'dd MMM yyyy')
                      : '—'}
                  </span>
                )}
              </TableCell>

              <TableCell className="py-3 text-center">
                {editing === 'dateOfBirth' ? (
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
                    onClick={() => startEdit('dateOfBirth')}
                    aria-label="Edit date of birth"
                  >
                    <SquarePen size={16} className="text-blue-500" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                Previous Name
              </TableCell>
              <TableCell className="py-2 text-foreground font-normaltext-sm">
                {editing === 'previousName' ? (
                  <div className="flex items-center gap-2">
                    <Input
                      className="w-64"
                      value={localInfo?.previousName ?? ''}
                      onChange={(e) =>
                        setLocalInfo((prev: any) => ({
                          ...prev,
                          previousName: e.target.value,
                        }))
                      }
                      placeholder="Enter previous name"
                    />
                  </div>
                ) : (
                  localInfo?.previousName
                )}
              </TableCell>
              <TableCell className="py-2 text-center">
                {editing === 'previousName' ? (
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
                    onClick={() => startEdit('previousName')}
                    aria-label="Edit previous name"
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

export { PersonalInfo };
