import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ReservationCard,
  Separator,
} from "src/components";
import { useAuthStore, useReservationStore } from "src/hooks/stores";

function ReservationSection({
  title,
  reservations,
  emptyMessage,
  showBrowseButton,
  onBrowse,
}: {
  title: string;
  reservations: any[];
  emptyMessage: string;
  showBrowseButton?: boolean;
  onBrowse?: () => void;
}) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        {reservations.length > 0 ? (
          <div className="h-full space-y-4 md:space-y-6">
            {reservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-600 mb-4">{emptyMessage}</p>
            {showBrowseButton && (
              <Button onClick={onBrowse}>Browse Rooms</Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const reservations = useReservationStore((s) => s.reservations);

  if (!user) {
    navigate("/login");
    return null;
  }

  const userReservations = reservations.filter((r) => r.userId === user.id);
  const activeReservations = userReservations.filter(
    (r) => r.status === "active"
  );
  const cancelledReservations = userReservations.filter(
    (r) => r.status === "cancelled"
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen-header bg-muted/30 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl md:text-3xl">
                Welcome, {user.name}!
              </CardTitle>
              <p className="text-muted-foreground mt-1">{user.email}</p>
            </div>
            <div className="flex gap-2 md:gap-3">
              <Button onClick={() => navigate("/")}>Browse Rooms</Button>
              <Button variant="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </CardHeader>
        </Card>

        <ReservationSection
          title="Active Reservations"
          reservations={activeReservations}
          emptyMessage="You don't have any active reservations."
          showBrowseButton
          onBrowse={() => navigate("/")}
        />

        {cancelledReservations.length > 0 && (
          <ReservationSection
            title="Cancelled Reservations"
            reservations={cancelledReservations}
            emptyMessage="No cancelled reservations."
          />
        )}
      </div>
    </div>
  );
}
