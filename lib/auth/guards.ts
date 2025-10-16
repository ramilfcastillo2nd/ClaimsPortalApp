import { getSession } from 'next-auth/react';

export async function checkUserPermission(
  requiredPermission: string
): Promise<boolean> {
  const session = await getSession();
  if (!session?.user?.permissions) return false;
  
  return session.user.permissions.includes(requiredPermission);
}

export async function checkUserRole(requiredRole: string): Promise<boolean> {
  const session = await getSession();
  if (!session?.user?.roles) return false;
  
  return session.user.roles.includes(requiredRole);
}

export async function hasAnyRole(roles: string[]): Promise<boolean> {
  const session = await getSession();
  if (!session?.user?.roles) return false;
  
  return roles.some(role => session.user.roles.includes(role));
}

export async function hasAllRoles(roles: string[]): Promise<boolean> {
  const session = await getSession();
  if (!session?.user?.roles) return false;
  
  return roles.every(role => session.user.roles.includes(role));
}

export async function hasAnyPermission(permissions: string[]): Promise<boolean> {
  const session = await getSession();
  if (!session?.user?.permissions) return false;
  
  return permissions.some(permission => session.user.permissions.includes(permission));
}

export async function hasAllPermissions(permissions: string[]): Promise<boolean> {
  const session = await getSession();
  if (!session?.user?.permissions) return false;
  
  return permissions.every(permission => session.user.permissions.includes(permission));
}

export async function canAccessResource(
  requiredRoles?: string[],
  requiredPermissions?: string[]
): Promise<boolean> {
  const session = await getSession();
  if (!session?.user) return false;

  // Check roles if provided
  if (requiredRoles && requiredRoles.length > 0) {
    const roleCheck = await hasAnyRole(requiredRoles);
    if (!roleCheck) return false;
  }

  // Check permissions if provided
  if (requiredPermissions && requiredPermissions.length > 0) {
    const permissionCheck = await hasAnyPermission(requiredPermissions);
    if (!permissionCheck) return false;
  }

  return true;
}

// Server-side guards for API routes
export function withAuth(handler: any) {
  return async (req: any, res: any) => {
    const session = await getSession({ req });
    
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = session.user;
    return handler(req, res);
  };
}

export function withRoles(roles: string[]) {
  return function(handler: any) {
    return async (req: any, res: any) => {
      const session = await getSession({ req });
      
      if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const hasRole = roles.some(role => session.user.roles?.includes(role));
      if (!hasRole) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      req.user = session.user;
      return handler(req, res);
    };
  };
}