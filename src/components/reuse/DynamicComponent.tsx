import { useAuthorizationContext } from '@/functions/AuthorizationContexts';

const DynamicComponent = ({
  children,
  show = true,
  roles,
  catchComponent,
}: {
  children: React.ReactNode;
  show?: boolean;
  roles?: string[] | undefined;
  catchComponent?: any;
}) => {
  const session = useAuthorizationContext();

  if (show) {
    let unauthorized = false;
    roles?.forEach((el: string) => {
      if (!session.user.roles[el]) unauthorized = true;
    });
    if (!unauthorized) return <>{children}</>;
    if (catchComponent) return catchComponent;
    return null;
  }

  return null;
};

export default DynamicComponent;
