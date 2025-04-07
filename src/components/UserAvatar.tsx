
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types";

interface UserAvatarProps {
  user: Pick<User, "name" | "avatar">;
  size?: "xs" | "sm" | "md" | "lg";
  showName?: boolean;
}

const UserAvatar = ({ user, size = "md", showName = false }: UserAvatarProps) => {
  const { name, avatar } = user;
  
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  
  const sizeClasses = {
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-16 w-16 text-lg",
  };
  
  return (
    <div className="flex items-center">
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      {showName && (
        <span className="ml-2 font-medium">{name}</span>
      )}
    </div>
  );
};

export default UserAvatar;
