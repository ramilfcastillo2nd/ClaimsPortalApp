import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IPreviousAddress } from '@/types/previousaddress';

const subscriptions = [
  {
    subscriptionId: 'SUB001',
    customerName: 'John Doe',
    plan: 'Pro',
    status: 'Active',
    renewalDate: '2024-02-15',
    amount: '$49.99',
  },
  {
    subscriptionId: 'SUB002',
    customerName: 'Jane Smith',
    plan: 'Basic',
    status: 'Cancelled',
    renewalDate: '2024-01-10',
    amount: '$19.99',
  },
  {
    subscriptionId: 'SUB003',
    customerName: 'Michael Brown',
    plan: 'Enterprise',
    status: 'Pending',
    renewalDate: '2024-03-01',
    amount: '$99.99',
  },
  {
    subscriptionId: 'SUB004',
    customerName: 'Emily Johnson',
    plan: 'Pro',
    status: 'Active',
    renewalDate: '2024-02-20',
    amount: '$49.99',
  },
  {
    subscriptionId: 'SUB005',
    customerName: 'David Wilson',
    plan: 'Basic',
    status: 'Active',
    renewalDate: '2024-02-05',
    amount: '$19.99',
  },
];

export default function PreviousAddress({previousAddresses}: {previousAddresses: IPreviousAddress[]}) {
  return (
    <Card className="min-w-full">
      <CardHeader>
        <CardTitle>Previous Addresses</CardTitle>
      </CardHeader>
      <CardContent className="kt-scrollable-x-auto pb-3 p-0">
        <Table>
          <TableCaption>
            A list of your active and past addresses.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Street Name</TableHead>
              <TableHead>Street Name 2</TableHead>
              <TableHead>Town</TableHead>
              <TableHead>County</TableHead>
              <TableHead>Postal Code</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {previousAddresses.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell className="font-medium">
                  {sub.streetName}
                </TableCell>
                <TableCell>{sub.streetName2}</TableCell>
                <TableCell>{sub.town}</TableCell>          
                <TableCell>{sub.city}</TableCell>
                <TableCell>{sub.postcode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
