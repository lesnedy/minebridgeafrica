import { queryOptions } from '@tanstack/react-query';
import { getGoldMarket } from './gold-market.functions';

export const goldMarketOptions = queryOptions({
  queryKey: ['gold-market'],
  queryFn: () => getGoldMarket(),
  staleTime: 30000,
  refetchInterval: 60000,
  retry: false,
});