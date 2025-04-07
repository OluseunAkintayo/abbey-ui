import { Button } from '@/components/ui/button';
import { GetProfileProps, Profile } from '@/lib/types';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { Edit } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import UpdateProfileModal from './UpdateProfileModal';

const Profiletab = () => {
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const placeholder = "/assets/placeholder.png";
  const getProfile = async () => {
    setLoading(true);
    const config: AxiosRequestConfig = {
      url: "users/profile",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    try {
      const res = await axios.request(config);
      const response: GetProfileProps = res.data;
      if (response.success) {
        setProfile(response.data);
        return;
      }
      setError(response.message);
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 401) navigate("/auth/login");
      setError((err.response?.data as { message: string })?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  return (
    <div>
      <div className="mt-8">
        {(loading && !profile) && (
          <div className='max-w-[440px] grid gap-6'>
            {
              [1, 2, 3, 4].map(item => (
                <div className='space-y-2' key={item}>
                  <div className='h-8 bg-slate-200 animate-pulse rounded-md' />
                  <div className='h-8 bg-slate-200 animate-pulse rounded-md' />
                </div>
              ))
            }
          </div>
        )}
        {
          (!loading && error) && (
            <div>
              <h3 className="text-destructive">An error has occurred: {error}</h3>
            </div>
          )
        }
        {
          (!loading && profile) && (
            <div className="grid gap-4">
              <div className='max-w-[200px]'>
                <img src={profile.picture ?? placeholder} className='' />
              </div>
              <div>
                <p className='font-semibold text-slate-500'>First Name</p>
                <p>{profile.firstName ?? "Update first name"}</p>
              </div>
              <div>
                <p className='font-semibold text-slate-500'>Bio</p>
                <p>{profile.bio ?? "Update bio"}</p>
              </div>
              <div>
                <p className='font-semibold text-slate-500'>Last Name</p>
                <p>{profile.lastName ?? "Update last name"}</p>
              </div>
              <div>
                <p className='font-semibold text-slate-500'>Username</p>
                <p>{profile.username ?? "Update username"}</p>
              </div>
              <div>
                <p className='font-semibold text-slate-500'>Email</p>
                <p>{profile.email ?? "Update email"}</p>
              </div>
              <div>
                <p className='font-semibold text-slate-500'>Last Login Date</p>
                <p>{profile.lastLoginDate ? `${new Date(profile.lastLoginDate).toLocaleDateString()} ${new Date(profile.lastLoginDate).toLocaleTimeString()}` : ""}</p>
              </div>
              <div>
                <Button onClick={() => setOpenModal(true)} className='w-[160px] h-11 cursor-pointer'><Edit /> Update Profile</Button>
              </div>
            </div>
          )
        }
      </div>
      <>{openModal && profile && <UpdateProfileModal open={openModal} close={() => setOpenModal(false)} profile={profile} />}</>
    </div>
  )
}

export default Profiletab;
