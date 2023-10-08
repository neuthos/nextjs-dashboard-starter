import type React from 'react';

export interface Page<P = Record<string, unknown>>
  extends React.FunctionComponent<P> {
  layout?: (page: React.ReactElement) => React.ReactNode;
  requireAuth?: boolean;
}
