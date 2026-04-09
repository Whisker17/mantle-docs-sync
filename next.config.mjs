import nextra from 'nextra'

const withNextra = nextra({
  contentDirBasePath: '/',
  latex: true
})

export default withNextra({
  reactStrictMode: true,
  async redirects() {
    return [
      // Root
      { source: '/', destination: '/mantle-network/overviews', permanent: false },

      // Introduction → Mantle Network
      { source: '/introduction', destination: '/mantle-network/overviews', permanent: true },
      { source: '/introduction/overviews', destination: '/mantle-network/overviews', permanent: true },
      { source: '/introduction/whats-new-in-mantle-v2-arsia', destination: '/mantle-network/whats-new-in-mantle-v2-arsia', permanent: true },
      { source: '/introduction/features/custom-gas-token', destination: '/mantle-network/features/custom-gas-token', permanent: true },
      { source: '/introduction/features/preconfirmations', destination: '/mantle-network/features/preconfirmations', permanent: true },
      { source: '/introduction/features/zk-validity-proofs', destination: '/mantle-network/features/sp1-zkvm', permanent: true },
      { source: '/introduction/features/three-component-fee-model', destination: '/mantle-network/protocol/fee-mechanism/fee-model-handbook-after-arsia', permanent: true },
      { source: '/introduction/features/dynamic-eip1559', destination: '/mantle-network/protocol/fee-mechanism/eip-1559-support', permanent: true },
      { source: '/introduction/features/metatx-gasless-transactions', destination: '/developers/resources-and-tooling/account-abstraction', permanent: true },

      // System Information → Mantle Network
      { source: '/system-information', destination: '/mantle-network/architecture', permanent: true },
      { source: '/system-information/architecture', destination: '/mantle-network/architecture', permanent: true },
      { source: '/system-information/roadmap', destination: '/notices/roadmap', permanent: true },
      { source: '/roadmap', destination: '/notices/roadmap', permanent: true },
      { source: '/mantle-network/roadmap', destination: '/notices/roadmap', permanent: true },
      { source: '/system-information/transaction-lifecycle', destination: '/mantle-network/transaction-lifecycle', permanent: true },
      { source: '/system-information/fee-mechanism', destination: '/mantle-network/fee-mechanism', permanent: true },
      { source: '/system-information/fee-mechanism/:slug', destination: '/mantle-network/fee-mechanism/:slug', permanent: true },
      { source: '/system-information/on-chain-system', destination: '/mantle-network/on-chain-system', permanent: true },
      { source: '/system-information/on-chain-system/:slug', destination: '/mantle-network/on-chain-system/:slug', permanent: true },
      { source: '/system-information/off-chain-system', destination: '/mantle-network/off-chain-system', permanent: true },
      { source: '/system-information/off-chain-system/contract-introduction', destination: '/mantle-network/off-chain-system/contract-introduction', permanent: true },
      { source: '/system-information/off-chain-system/key-l2-contract-address', destination: '/mantle-network/off-chain-system/key-l2-contract-address', permanent: true },
      { source: '/system-information/off-chain-system/node-introduction', destination: '/mantle-network/off-chain-system/node-introduction', permanent: true },
      { source: '/system-information/off-chain-system/sp1-zkvm', destination: '/mantle-network/sp1-zkvm', permanent: true },
      { source: '/system-information/off-chain-system/sp1-zkvm/:slug', destination: '/mantle-network/sp1-zkvm', permanent: true },
      { source: '/system-information/risk-management', destination: '/mantle-network/risk-management', permanent: true },
      { source: '/system-information/risk-management/:slug', destination: '/mantle-network/risk-management/:slug', permanent: true },
      // Flattened paths redirects
      { source: '/mantle-network/features/:slug', destination: '/mantle-network/:slug', permanent: true },
      { source: '/mantle-network/protocol/:path*', destination: '/mantle-network/:path*', permanent: true },

      // for-developers → developers
      { source: '/for-developers', destination: '/developers/quick-access', permanent: true },
      { source: '/for-developers/quick-access', destination: '/developers/quick-access', permanent: true },
      { source: '/for-developers/faqs', destination: '/developers/faqs', permanent: true },
      { source: '/for-developers/troubleshooting', destination: '/developers/troubleshooting', permanent: true },
      { source: '/for-developers/optimize-your-transaction-fees', destination: '/developers/optimize-your-transaction-fees', permanent: true },
      { source: '/for-developers/the-differences-between-mantle-op-stack-and-ethereum', destination: '/developers/opcode-differences', permanent: true },
      { source: '/for-developers/resources-and-tooling', destination: '/developers/resources-and-tooling', permanent: true },
      { source: '/for-developers/resources-and-tooling/:slug', destination: '/developers/resources-and-tooling/:slug', permanent: true },
      { source: '/for-developers/resources-and-tooling/account-abstraction', destination: '/developers/resources-and-tooling/account-abstraction', permanent: true },
      { source: '/for-developers/resources-and-tooling/account-abstraction/:slug', destination: '/developers/resources-and-tooling/account-abstraction/:slug', permanent: true },
      { source: '/for-developers/resources-and-tooling/wallet', destination: '/developers/resources-and-tooling/wallet', permanent: true },
      { source: '/for-developers/resources-and-tooling/wallet/:slug', destination: '/developers/resources-and-tooling/wallet/:slug', permanent: true },
      { source: '/for-developers/how-to-guides', destination: '/developers/how-to-guides', permanent: true },
      { source: '/for-developers/how-to-guides/:path*', destination: '/developers/how-to-guides/:path*', permanent: true },
      { source: '/for-developers/common-use-cases', destination: '/developers/common-use-cases', permanent: true },
      { source: '/for-developers/common-use-cases/:slug', destination: '/developers/common-use-cases/:slug', permanent: true },

      // for-node-operators → node-operators
      { source: '/for-node-operators', destination: '/node-operators/deploy-from-docker', permanent: true },
      { source: '/for-node-operators/network-roles', destination: '/node-operators/network-roles', permanent: true },
      { source: '/for-node-operators/faqs', destination: '/node-operators/faqs', permanent: true },
      { source: '/for-node-operators/deployment-guides', destination: '/node-operators/deploy-from-docker', permanent: true },
      { source: '/for-node-operators/deployment-guides/mainnet-v1.4.2', destination: '/node-operators/deploy-from-docker', permanent: true },
      { source: '/for-node-operators/deployment-guides/mainnet-v1.4.2/deploying-a-rollup-verifier-replica-node-from-binary', destination: '/node-operators/deploy-from-binary', permanent: true },
      { source: '/for-node-operators/deployment-guides/mainnet-v1.4.2/deploying-a-rollup-verifier-replica-node-from-docker', destination: '/node-operators/deploy-from-docker', permanent: true },
      { source: '/for-node-operators/deployment-guides/testnet-v1.5.3', destination: '/node-operators/deploy-from-docker', permanent: true },
      { source: '/for-node-operators/deployment-guides/testnet-v1.5.3/deploying-a-sepolia-rollup-verifier-replica-node-from-docker', destination: '/node-operators/deploy-from-docker', permanent: true },
      { source: '/for-node-operators/network-updates', destination: '/node-operators/changelogs', permanent: true },
      { source: '/for-node-operators/network-updates/changelogs', destination: '/node-operators/changelogs', permanent: true },
      { source: '/for-node-operators/network-updates/changelogs/:slug', destination: '/node-operators/changelogs/:slug', permanent: true },
      // Flattened paths redirects
      { source: '/node-operators/tutorials/:slug', destination: '/node-operators/:slug', permanent: true },
      { source: '/node-operators/reference/:slug', destination: '/node-operators/:slug', permanent: true },

      // for-users → users
      { source: '/for-users', destination: '/users/how-to-guides', permanent: true },
      { source: '/for-users/faqs', destination: '/users/faqs', permanent: true },
      { source: '/for-users/ecosystem', destination: '/users/supported-wallets', permanent: true },
      { source: '/for-users/ecosystem/:slug', destination: '/users/:slug', permanent: true },
      { source: '/for-users/how-to-guides', destination: '/users/how-to-guides', permanent: true },
      { source: '/for-users/how-to-guides/:slug', destination: '/users/how-to-guides/:slug', permanent: true },
      // Flattened paths redirects
      { source: '/users/ecosystem/:slug', destination: '/users/:slug', permanent: true },
      { source: '/developers/reference/:slug', destination: '/developers/:slug', permanent: true },

      // Notices (archive flattened into notices/)
      { source: '/notices', destination: '/notices/arsia-mainnet-activation', permanent: false },
      { source: '/notices/archive/:slug', destination: '/notices/:slug', permanent: true },

      // More section (dissolved)
      { source: '/more', destination: '/mantle-network/audits', permanent: true },
      { source: '/more/audits', destination: '/mantle-network/audits', permanent: true },
      { source: '/more/glossary', destination: '/mantle-network/glossary', permanent: true },
      { source: '/more/faqs', destination: '/developers/reference/faqs', permanent: true },
    ]
  },
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './mdx-components.js'
    }
  }
})
