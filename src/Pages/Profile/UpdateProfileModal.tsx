import React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { GenericResponse, Profile } from '@/lib/types';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


interface UpdateProfileModalProps {
  open: boolean;
  close: () => void;
  profile: Profile;
}

const UpdateProfileModal = ({ open, close, profile }: UpdateProfileModalProps) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [newProfile, setNewProfile] = React.useState<Profile>(profile);
  const handleChange = (field: string, value: string) => {
    setNewProfile((prev) => {
      return {
        ...prev,
        [field]: value
      }
    })
  }
  const handleSwitchChange = (value: boolean) => {
    setNewProfile((prev) => ({
      ...prev,
      isActive: value
    }));
  }

  const update = async (e: React.FormEvent) => {
    e.preventDefault();
    const config: AxiosRequestConfig = {
      url: "users/profile/update",
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data: {
        firstName: newProfile.firstName,
        lastName: newProfile.lastName,
        username: newProfile.username,
        bio: newProfile.bio,
        picture: newProfile.picture,
        isActive: newProfile.isActive
      }
    }

    setLoading(true);
    try {
      const response: GenericResponse = (await axios.request(config)).data;
      if (response.success) {
        window.location.reload();
        return;
      }
      setError("Unable to update profile");
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<{ message?: string; field?: string }>;
      if (err.response?.data?.message) {
        setError(err.response.data.message);
        return;
      }
      if (err.response?.data?.field) {
        setError(err.response.data.field);
        return;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update Profile - <span className='capitalize'>{profile.username}</span></AlertDialogTitle>
          <AlertDialogDescription>
            Update your profile info
          </AlertDialogDescription>
          <form onSubmit={update} className='mt-4 space-y-5'>
            <div className="space-y-2">
              <Label className='text-slate-600 font-semibold'>First Name</Label>
              <Input
                defaultValue={profile.firstName} placeholder='Enter First Name'
                onChange={(e) => handleChange('firstName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className='text-slate-600 font-semibold'>Last Name</Label>
              <Input
                defaultValue={profile.lastName} placeholder='Enter Last Name'
                onChange={(e) => handleChange('lastName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className='text-slate-600 font-semibold'>Username</Label>
              <Input defaultValue={profile.username} placeholder='Enter Username'
                onChange={(e) => handleChange('username', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className='text-slate-600 font-semibold'>Bio</Label>
              <Textarea
                defaultValue={profile.bio} placeholder='Enter a short description of yourself'
                onChange={(e) => handleChange('bio', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className='text-slate-600 font-semibold'>Active Status</Label>
              <div className='flex justify-start'>
                <Switch defaultChecked={profile.isActive} onCheckedChange={handleSwitchChange} className='cursor-pointer' />
              </div>
            </div>
            {error && (
              <div>
                <Alert variant="destructive">
                  <AlertTitle className='text-left'>Error!</AlertTitle>
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button type='submit' disabled={loading} className='cursor-pointer'>
                {loading ? <Loader className='animate-spin' /> : "Update"}
              </Button>
              <Button type='button' disabled={loading} className='bg-destructive hover:bg-destructive/80 cursor-pointer' onClick={close}>Cancel</Button>
            </div>
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter />
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default UpdateProfileModal;