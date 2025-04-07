import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  const usermail = localStorage.getItem('email');
  const logout = () => {
    localStorage.clear();
    navigate("/auth/login");
  }
  const profile = () => navigate("/profile");

  return (
    <header>
      <div className='p-4 shadow-md'>
        <div className="flex gap justify-between items-center">
          <div>
            <h2 className='font-semibold text-slate-600'>Abbey</h2>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className='cursor-pointer'>
              <Avatar>
                <AvatarImage src="/assets/placeholder.png" alt="@shadcn" />
                <AvatarFallback>{usermail ? usermail[0]?.toUpperCase() : ""}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={profile}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header;
