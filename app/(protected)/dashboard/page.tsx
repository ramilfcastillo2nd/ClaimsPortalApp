import { Fragment } from 'react';
import {
  EllipsisVertical,
  Luggage,
  Mail,
  MapPin,
  MessageSquareText,
  Users,
} from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { UserHero } from '@/app/components/partials/common/user-hero';
import { DropdownMenu9 } from '@/app/components/partials/dropdown-menu/dropdown-menu-9';
import { Navbar, NavbarActions } from '@/app/components/partials/navbar/navbar';
import DashboardPage from './dashboard';

export default function Page() {
  //  const image = (
  //     <img
  //       src={toAbsoluteUrl('/media/avatars/300-1.png')}
  //       className="rounded-full border-3 border-green-500 size-[100px] shrink-0"
  //       alt="image"
  //     />
  //   );
  return (
    <Fragment>
      {/* <UserHero
        name="Jenny Klabber"
        image={image}
        info={[
          { label: 'KeenThemes', icon: Luggage },
          { label: 'SF, Bay Area', icon: MapPin },
          { email: 'jenny@kteam.com', icon: Mail },
        ]}
      /> */}
      {/* <Container>
        <Navbar>
          <NavbarActions>
            <Button>
              <Users /> Connect
            </Button>
            <Button variant="outline" mode="icon">
              <MessageSquareText />
            </Button>
            <DropdownMenu9
              trigger={
                <Button variant="outline" mode="icon">
                  <EllipsisVertical />
                </Button>
              }
            />
          </NavbarActions>
        </Navbar>
      </Container> */}
      <Container>
        <DashboardPage />
      </Container>
    </Fragment>
  );
}
