import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

export function usePermissions() {
  const { data: session } = useSession();

  const permissions = useMemo(() => {
    return session?.user?.permissions || [];
  }, [session?.user?.permissions]);

  const roles = useMemo(() => {
    return session?.user?.roles || [];
  }, [session?.user?.roles]);

  const hasPermission = (permission: string): boolean => {
    return permissions.includes(permission);
  };

  const hasRole = (role: string): boolean => {
    return roles.includes(role);
  };

  const hasAnyPermission = (permissionList: string[]): boolean => {
    return permissionList.some(permission => permissions.includes(permission));
  };

  const hasAllPermissions = (permissionList: string[]): boolean => {
    return permissionList.every(permission => permissions.includes(permission));
  };

  const hasAnyRole = (roleList: string[]): boolean => {
    return roleList.some(role => roles.includes(role));
  };

  const hasAllRoles = (roleList: string[]): boolean => {
    return roleList.every(role => roles.includes(role));
  };

  const canAccess = (requiredRoles?: string[], requiredPermissions?: string[]): boolean => {
    const roleCheck = !requiredRoles?.length || hasAnyRole(requiredRoles);
    const permissionCheck = !requiredPermissions?.length || hasAnyPermission(requiredPermissions);
    
    return roleCheck && permissionCheck;
  };

  return {
    permissions,
    roles,
    hasPermission,
    hasRole,
    hasAnyPermission,
    hasAllPermissions,
    hasAnyRole,
    hasAllRoles,
    canAccess,
  };
}