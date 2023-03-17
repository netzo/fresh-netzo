interface Kpi {
  title: string
  metric: string
  progress: number
  target: string
  delta: string
  deltaType:
  | 'increase'
  | 'moderateIncrease'
  | 'moderateDecrease'
  | 'decrease'
  | 'unchanged'
}

interface Sale {
  name: string
  leads: number
  sales: string
  quota: string
  variance: 'low' | 'medium' | 'high'
  region: string
  status: 'overperforming' | 'underperforming' | 'average'
  deltaType:
  | 'increase'
  | 'moderateIncrease'
  | 'unchanged'
  | 'moderateDecrease'
  | 'decrease'
}

export const getDataKpis = (): Kpi[] => {
  return [
    {
      'title': 'Sales',
      'metric': '$ 12,699',
      'progress': 15.9,
      'target': '$ 80,000',
      'delta': '13.2%',
      'deltaType': 'moderateIncrease',
    },
    {
      'title': 'Profit',
      'metric': '$ 45,564',
      'progress': 36.5,
      'target': '$ 125,000',
      'delta': '23.9%',
      'deltaType': 'increase',
    },
    {
      'title': 'Customers',
      'metric': '1,072',
      'progress': 53.6,
      'target': '2,000',
      'delta': '10.1%',
      'deltaType': 'moderateDecrease',
    },
  ]
}

export const getDataSales = (): Sale[] => {
  return [
    {
      'name': 'Jane Smith',
      'leads': 60,
      'sales': '500,000',
      'quota': '750,000',
      'variance': 'high',
      'region': 'Region D',
      'status': 'overperforming',
      'deltaType': 'increase',
    },
    {
      'name': 'Joe Sachs',
      'leads': 49,
      'sales': '1,230,000',
      'quota': '1,800,000',
      'variance': 'medium',
      'region': 'Region B',
      'status': 'underperforming',
      'deltaType': 'moderateDecrease',
    },
    {
      'name': 'Peter Doe',
      'leads': 45,
      'sales': '1,000,000',
      'quota': '1,200,000',
      'variance': 'low',
      'region': 'Region A',
      'status': 'overperforming',
      'deltaType': 'moderateIncrease',
    },
    {
      'name': 'John Camper',
      'leads': 22,
      'sales': '390,000',
      'quota': '250,000',
      'variance': 'low',
      'region': 'Region A',
      'status': 'overperforming',
      'deltaType': 'increase',
    },
    {
      'name': 'Peter Moore',
      'leads': 82,
      'sales': '1,460,000',
      'quota': '1,500,000',
      'variance': 'low',
      'region': 'Region A',
      'status': 'average',
      'deltaType': 'unchanged',
    },
    {
      'name': 'Max Balmoore',
      'leads': 49,
      'sales': '860,000',
      'quota': '750,000',
      'variance': 'low',
      'region': 'Region B',
      'status': 'overperforming',
      'deltaType': 'increase',
    },
    {
      'name': 'Phil Less',
      'leads': 52,
      'sales': '930,000',
      'quota': '1,000,000',
      'variance': 'medium',
      'region': 'Region C',
      'status': 'underperforming',
      'deltaType': 'moderateDecrease',
    },
    {
      'name': 'Max Smith',
      'leads': 45,
      'sales': '1,040,000',
      'quota': '900,000',
      'variance': 'low',
      'region': 'Region C',
      'status': 'overperforming',
      'deltaType': 'moderateIncrease',
    },
    {
      'name': 'Lena Whitehouse',
      'leads': 35,
      'sales': '900,000',
      'quota': '1,000,000',
      'variance': 'low',
      'region': 'Region B',
      'status': 'average',
      'deltaType': 'unchanged',
    },
  ]
}
