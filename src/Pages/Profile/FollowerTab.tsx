import { GetFollowersProps} from '@/lib/types';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const FollowerTab = () => {
  const [followers, setFollowers] = React.useState<{ email: string; username: string; picture: string | null }[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const placeholder = "/assets/placeholder.png";

  const getFollowers = async () => {
    setLoading(true);
    const config: AxiosRequestConfig = {
      url: "users/followers",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    try {
      const res = await axios.request(config);
      const response: GetFollowersProps = res.data;
      if (response.success) {
        setFollowers(response.data);
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
    getFollowers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="mt-8">
        {(loading && !followers) && (
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
          (!loading && followers) && (
            <div className="grid gap-4">
              {followers.map((follower, index) => (
                <div key={index} className='max-w-[200px] flex items-center gap-4 border-b p-4'>
                  <img src={follower.picture ?? placeholder} className='w-16 rounded-full' alt={`${follower.username}'s profile`} />
                  <div className="mt-2">
                    <p className="capitalize font-semibold text-slate-600">{follower.username}</p>
                    <p className="text-sm text-gray-500">{follower.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default FollowerTab;
