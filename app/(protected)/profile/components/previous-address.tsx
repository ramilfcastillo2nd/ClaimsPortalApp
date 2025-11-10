import { useEffect, useState } from 'react';
import { Check, Plus, SquarePen, X } from 'lucide-react';
import { IPreviousAddress } from '@/types/previousaddress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';

export default function PreviousAddress({
  previousAddresses,
  onChangePreviousAddresses,
}: {
  previousAddresses: IPreviousAddress[];
  onChangePreviousAddresses?: (next: any) => void;
}) {
  const [localInfo, setLocalInfo] =
    useState<IPreviousAddress[]>(previousAddresses);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setLocalInfo(previousAddresses);
  }, [previousAddresses]);

  const startEdit = (id: number) => {
    setEditingRowId(id);
  };
  const cancelEdit = () => {
    setLocalInfo(previousAddresses);
    setEditingRowId(null);
    setAdding(false);
  };
  const saveEdit = () => {
    onChangePreviousAddresses?.(localInfo);
    setEditingRowId(null);
    setAdding(false);
  };
  const updateField = (
    id: number,
    field: keyof IPreviousAddress,
    value: string,
  ) => {
    setLocalInfo((prev) =>
      prev.map((addr) => (addr.id === id ? { ...addr, [field]: value } : addr)),
    );
  };
    const addNew = () => {
    if (adding) return;
    const newId =
      (localInfo.reduce((m, a) => (a.id > m ? a.id : m), 0) || 0) + 1;
    const blank: IPreviousAddress = {
      id: newId,
      streetName: '',
      streetName2: '',
      town: '',
      county: '',
      postcode: '',
    };
    setLocalInfo((prev) => [...prev, blank]);
    setEditingRowId(newId);
    setAdding(true);
  };
 return (
    <Card className="min-w-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Previous Addresses</CardTitle>
        <Button variant="outline" size="sm" onClick={addNew}>
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </CardHeader>
      <CardContent className="kt-scrollable-x-auto pb-3 p-0">
        <Table>
          <TableCaption>A list of your active and past addresses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[160px]">Street Name</TableHead>
              <TableHead className="w-[160px]">Street Name 2</TableHead>
              <TableHead className="w-[140px]">Town</TableHead>
              <TableHead className="w-[140px]">County</TableHead>
              <TableHead className="w-[120px]">Postal Code</TableHead>
              <TableHead className="text-right w-[120px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localInfo.map((address) => {
              const isEditing = editingRowId === address.id;
              return (
                <TableRow key={address.id}>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        value={address.streetName ?? ''}
                        onChange={(e) =>
                          updateField(address.id, 'streetName', e.target.value)
                        }
                        placeholder="Street Name"
                      />
                    ) : (
                      address.streetName || '—'
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        value={address.streetName2 ?? ''}
                        onChange={(e) =>
                          updateField(address.id, 'streetName2', e.target.value)
                        }
                        placeholder="Street Name 2"
                      />
                    ) : (
                      address.streetName2 || '—'
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        value={address.town ?? ''}
                        onChange={(e) =>
                          updateField(address.id, 'town', e.target.value)
                        }
                        placeholder="Town"
                      />
                    ) : (
                      address.town || '—'
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        value={address.county ?? ''}
                        onChange={(e) =>
                          updateField(address.id, 'county', e.target.value)
                        }
                        placeholder="County"
                      />
                    ) : (
                      address.county || '—'
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        value={address.postcode ?? ''}
                        onChange={(e) =>
                          updateField(address.id, 'postcode', e.target.value)
                        }
                        placeholder="Postcode"
                      />
                    ) : (
                      address.postcode || '—'
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {isEditing ? (
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
                        onClick={() => startEdit(address.id)}
                        aria-label="Edit address"
                      >
                        <SquarePen size={16} className="text-blue-500" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
            {localInfo.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-sm text-muted-foreground">
                  No previous addresses.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {editingRowId !== null && (
          <div className="flex justify-end gap-2 px-4 pb-4">
            <Button variant="secondary" onClick={cancelEdit}>
              Cancel
            </Button>
            <Button onClick={saveEdit}>Save Changes</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
