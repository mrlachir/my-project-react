import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  User, 
  CreditCard, 
  LogOut, 
  Bell, 
  Shield,
  Calendar
} from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: '/api/placeholder/100/100'
  });
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '' });
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => {
    // Fetch user profile
    axios.get('/profile')
      .then(response => setUser(response.data))
      .catch(err => setError('Failed to fetch profile'));

    // Fetch bookings
    axios.get('/bookings')
      .then(response => setBookings(response.data.bookings))
      .catch(err => setError('Failed to fetch bookings'));
  }, []);

  const handleUpdateProfile = (formData) => {
    setError(null);
    axios.patch('/profile', formData)
      .then(response => {
        setUser(response.data.user);
        alert('Profile updated successfully!');
      })
      .catch(err => setError('Failed to update profile'));
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setPasswordError(null);
    axios.patch('/profile/password', passwordForm)
      .then(() => {
        alert('Password updated successfully!');
        setPasswordForm({ oldPassword: '', newPassword: '' });
      })
      .catch(err => {
        if (err.response?.status === 400) {
          setPasswordError('New password too short');
        } else {
          setPasswordError('Failed to update password');
        }
      });
  };

  const handleCancelBooking = (bookingId) => {
    axios.patch(`/bookings/${bookingId}`, { status: 'Cancelled' })
      .then(() => {
        setBookings(bookings.filter(booking => booking._id !== bookingId));
        alert('Booking cancelled successfully');
      })
      .catch(err => setError('Failed to cancel booking'));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name ? user.name[0] : 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Déconnexion
        </Button>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">
            <User className="mr-2 h-4 w-4" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger value="bookings">
            <Calendar className="mr-2 h-4 w-4" />
            Réservations
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Informations Personnelles</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProfile({
                  name: e.target.name.value,
                  email: e.target.email.value
                });
              }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input
                    id="name"
                    defaultValue={user.name}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user.email}
                  />
                </div>
                <Button type="submit">Sauvegarder les modifications</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
            </CardHeader>
            <CardContent>
              {passwordError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{passwordError}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="oldPassword">Mot de passe actuel</Label>
                  <Input
                    id="oldPassword"
                    type="password"
                    value={passwordForm.oldPassword}
                    onChange={(e) => setPasswordForm({
                      ...passwordForm,
                      oldPassword: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value
                    })}
                  />
                </div>
                <Button type="submit">Mettre à jour le mot de passe</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Mes Réservations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings
                  .filter(booking => booking.status !== 'Cancelled')
                  .map(booking => (
                    <div key={booking._id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{booking.travel.name}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${booking.totalPrice}</p>
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {booking.status}
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="destructive" 
                        onClick={() => handleCancelBooking(booking._id)}
                      >
                        Annuler la réservation
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Les préférences de notification seront disponibles prochainement.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;