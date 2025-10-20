export type DemoInsurer = {
  name: string
  logoUrl: string
}

// ALL DEMO DATA THAT CAN BE DELETED WHEN WE HAVE REAL DATA
export const demoInsurers: Record<string, DemoInsurer> = {
  Progressive: {
    name: 'Progressive',
    logoUrl:
      'https://cdn.brandfetch.io/idFDF9ze43/w/600/h/600/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1698221441915',
  },
  AllState: {
    name: 'AllState',
    logoUrl:
      'https://cdn.brandfetch.io/idy9-2iz_S/w/300/h/300/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1689946272206',
  },
  StateFarm: {
    name: 'StateFarm',
    logoUrl:
      'https://cdn.brandfetch.io/idzveZQJ1Y/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1667664725196',
  },
}

export function getDemoInsurer(carrier: string) {
  return demoInsurers[carrier] ?? null
}
