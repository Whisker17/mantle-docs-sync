# MANTLE NETWORK DOCUMENTATION STRUCTURE INVENTORY
**Generated: 2026-04-08**

## SUMMARY STATISTICS
- **Total MDX Files**: 117
- **Total _meta.js Files**: 31
- **Top-Level Sections**: 8 (+ home page)

---

## ROOT LEVEL
- **content/_meta.js** - Top-level navigation structure
- **content/index.mdx** - Home page (title: "Mantle Network Documentation", redirects to /introduction)

---

## 1. INTRODUCTION SECTION
**Path**: `content/introduction/`
**Navigation**: introduction/_meta.js
**MDX Files**: 2 parent + 6 feature pages = 8 files

### Navigation Structure (introduction/_meta.js):
1. overviews - "Overviews"
2. features - "Features"
3. whats-new-in-mantle-v2-arsia - "What's New in Mantle v2 Arsia"
4. [separator]
5. status ↗ (external link)
6. faucet ↗ (external link)
7. bridge ↗ (external link)
8. explorer ↗ (external link)

### Pages:
- **overviews.mdx** - Overview of Mantle Network as ZK Validity Rollup
- **whats-new-in-mantle-v2-arsia.mdx** - Arsia upgrade features and changes

### Features Subsection (introduction/features/):
**_meta.js** navigation order:
1. custom-gas-token - "Custom Gas Token"
2. preconfirmations - "Preconfirmations"
3. zk-validity-proofs - "ZK Validity Proofs"
4. three-component-fee-model - "Three-Component Fee Model"
5. dynamic-eip1559 - "Dynamic EIP-1559 with DA Awareness"
6. metatx-gasless-transactions - "MetaTx Gasless Transactions"

**Pages**:
- **custom-gas-token.mdx** - MNT as native gas token instead of ETH
- **preconfirmations.mdx** - Sequencer preconfirmations for early inclusion commitments
- **zk-validity-proofs.mdx** - ZK validity proof mechanism (replaces fraud proofs)
- **three-component-fee-model.mdx** - L2Execution + L1Data + OperatorFee model
- **dynamic-eip1559.mdx** - Dynamic base fee with DA footprint awareness
- **metatx-gasless-transactions.mdx** - Fee sponsorship via MetaTx (deprecated after EIP-7702)

---

## 2. SYSTEM INFORMATION SECTION
**Path**: `content/system-information/`
**Navigation**: system-information/_meta.js
**MDX Files**: 2 parent + multiple subsections

### Root Pages:
- **architecture.mdx** - End-to-end architecture with modular components
- **roadmap.mdx** - 2025+ development roadmap
- **transaction-lifecycle.mdx** - L2→L1 and L1→L2 transaction workflows

### Navigation Structure (system-information/_meta.js):
1. architecture - "Architecture"
2. fee-mechanism - "Fee Mechanism"
3. off-chain-system - "Off-Chain System"
4. on-chain-system - "On-Chain System"
5. risk-management - "Risk Management"
6. roadmap - "Roadmap"
7. transaction-lifecycle - "Transaction Lifecycle"

### Subsection 2A: Fee Mechanism
**Path**: `content/system-information/fee-mechanism/`
**_meta.js** navigation:
1. eip-1559-support - "EIP-1559 Support"
2. estimate-fees - "Estimate Fees"
3. fee-model-handbook-after-arsia - "Fee Model Handbook (After Arsia)"
4. native-token-migration - "Native Token Migration"

**Pages**:
- **index.mdx** - Fee basics overview (asIndexPage: true)
- **eip-1559-support.mdx** - EIP-1559 mechanism and base fee dynamics
- **estimate-fees.mdx** - Fee estimation with tokenRatio calculations
- **fee-model-handbook-after-arsia.mdx** - Post-Arsia upgrade fee model (Sepolia)
- **native-token-migration.mdx** - MNT as native token transition from v1 to v2

### Subsection 2B: Off-Chain System
**Path**: `content/system-information/off-chain-system/`
**_meta.js** navigation:
1. contract-introduction - "Contract Introduction"
2. key-l2-contract-address - "Key L2 Contract Address"
3. node-introduction - "Node Introduction"
4. sp1-zkvm - "SP1 zkVM"

**Pages**:
- **index.mdx** - Index with all subsection links (asIndexPage: true)
- **contract-introduction.mdx** - BVM_GasPriceOracle, L1_BLOCK_NUMBER, L2CrossDomainMessenger, etc.
- **node-introduction.mdx** - Sequencer, Verifier, and other network roles
- **key-l2-contract-address.mdx** - L2 contract addresses table (Mainnet/Testnet tabs)

#### SP1 zkVM Subsection
**Path**: `content/system-information/off-chain-system/sp1-zkvm/`
**_meta.js** navigation:
1. introduction - "Introduction"
2. sp1-workflow - "SP1 Workflow"

**Pages**:
- **index.mdx** - SP1 zkVM links (asIndexPage: true)
- **introduction.mdx** - SP1 as RISC-V based zero-knowledge VM
- **sp1-workflow.mdx** - Transaction to validity proof generation lifecycle

### Subsection 2C: On-Chain System
**Path**: `content/system-information/on-chain-system/`
**_meta.js** navigation:
1. contract-introduction - "Contract Introduction"
2. key-l1-contract-address - "Key L1 Contract Address"

**Pages**:
- **index.mdx** - Index with contract links (asIndexPage: true)
- **contract-introduction.mdx** - L1CrossDomainMessenger, L1StandardBridge, etc.
- **key-l1-contract-address.mdx** - L1 contract addresses with Etherscan links

### Subsection 2D: Risk Management
**Path**: `content/system-information/risk-management/`
**_meta.js** navigation:
1. forced-transaction-inclusion - "Forced Transaction Inclusion"
2. zk-validity-proof - "zk Validity Proof"

**Pages**:
- **index.mdx** - Risk overview: Data Availability, Fraud Proofs, Forced Inclusion (asIndexPage: true)
- **zk-validity-proof.mdx** - SP1 zkVM-based validity proofs and fallback mechanisms
- **forced-transaction-inclusion.mdx** - OptimismPortal and forced withdrawal mechanisms

---

## 3. FOR USERS SECTION
**Path**: `content/for-users/`
**Navigation**: for-users/_meta.js
**MDX Files**: 1 parent + 2 subsections = 8 files

### Navigation Structure (for-users/_meta.js):
1. ecosystem - "Ecosystem"
2. faqs - "FAQs"
3. how-to-guides - "How-to Guides"
4. [separator]
5. bridge ↗
6. explorer ↗

### Root Pages:
- **faqs.mdx** - FAQ on L1/L2, gas fees, token imports, bridge safety

### Subsection 3A: Ecosystem
**Path**: `content/for-users/ecosystem/`
**_meta.js** navigation:
1. supported-wallets - "Supported Wallets"

**Pages**:
- **index.mdx** - Ecosystem index (asIndexPage: true)
- **supported-wallets.mdx** - Multisig wallets (Safe), MPC wallets, EOA wallets

### Subsection 3B: How-to Guides
**Path**: `content/for-users/how-to-guides/`
**_meta.js** navigation:
(No _meta.js, links in index.mdx)

**Pages**:
- **index.mdx** - Guide index (asIndexPage: true)
- **connecting-wallet-to-mantle-network.mdx** - Chainlist and manual RPC setup
- **fetching-test-tokens.mdx** - Sepolia ETH faucets and MNT testnet tokens
- **using-mantle-bridge.mdx** - Deposit/withdrawal via official bridge

---

## 4. FOR DEVELOPERS SECTION
**Path**: `content/for-developers/`
**Navigation**: for-developers/_meta.js
**MDX Files**: ~50+ files across multiple subsections

### Navigation Structure (for-developers/_meta.js):
1. common-use-cases - "Common Use Cases"
2. faqs - "FAQs"
3. how-to-guides - "How-to Guides"
4. optimize-your-transaction-fees - "Optimize Your Transaction Fees"
5. quick-access - "Quick Access"
6. resources-and-tooling - "Resources & Tooling"
7. the-differences-between-mantle-op-stack-and-ethereum - "The Differences between Mantle, OP Stack, and Ethereum"
8. troubleshooting - "Troubleshooting"
9. [separator]
10. faucet ↗
11. bridge ↗
12. explorer ↗

### Root Pages:
- **quick-access.mdx** - RPC URLs, chain ID, block explorers, official contracts
- **faqs.mdx** - EIP-1559 support, gas fee optimization, gas usage calculation
- **optimize-your-transaction-fees.mdx** - Gas optimization for MetaMask, Hardhat, Ethers.js, Web3.js
- **the-differences-between-mantle-op-stack-and-ethereum.mdx** - Opcode differences, block/tx differences
- **troubleshooting.mdx** - Rate limiting, timeout errors, intrinsic gas issues

### Subsection 4A: Common Use Cases
**Path**: `content/for-developers/common-use-cases/`
**_meta.js** navigation:
1. adding-a-custom-bridge-to-mantle - "Adding a Custom Bridge to Mantle"
2. adding-mantle-to-a-cex - "Adding Mantle to a CEX"
3. adding-mantle-wallet-support - "Adding Mantle Wallet Support"
4. moving-assets-and-data - "Moving Assets and Data"

**Pages**:
- **index.mdx** - Use cases overview (asIndexPage: true)
- **adding-a-custom-bridge-to-mantle.mdx** - Standard vs custom bridge development
- **adding-mantle-to-a-cex.mdx** - RPC integration, token balance fetching
- **adding-mantle-wallet-support.mdx** - RPC endpoints, fee calculations, address handling
- **moving-assets-and-data.mdx** - Asset bridging and cross-chain messaging

### Subsection 4B: How-to Guides
**Path**: `content/for-developers/how-to-guides/`
**_meta.js** navigation:
1. how-to-bridge-your-assets - "How to Bridge Your Assets"
2. how-to-deploy-smart-contracts - "How to Deploy Smart Contracts"
3. how-to-use-mantle-sdk - "How to Use Mantle SDK"
4. how-to-use-mantle-viem - "How to Use Mantle Viem"
5. how-to-verify-smart-contracts - "How to Verify Smart Contracts"

**Root Page**:
- **index.mdx** - Guides overview (asIndexPage: true)

#### 4B1: How to Bridge Your Assets
**Path**: `content/for-developers/how-to-guides/how-to-bridge-your-assets/`
**_meta.js**:
1. bridging-your-custom-erc-20-token-using-the-standard-bridge
2. bridging-your-standard-erc-20-token-using-the-standard-bridge

**Pages**:
- **index.mdx** - Bridging overview (asIndexPage: true)
- **bridging-your-standard-erc-20-token-using-the-standard-bridge.mdx** - OptimismMintableERC20 factory
- **bridging-your-custom-erc-20-token-using-the-standard-bridge.mdx** - Custom ERC-20 logic on L2

#### 4B2: How to Deploy Smart Contracts
**Path**: `content/for-developers/how-to-guides/how-to-deploy-smart-contracts/`
**_meta.js**:
1. use-foundry-to-deploy-smart-contracts
2. use-hardhat-to-deploy-smart-contracts
3. use-remix-to-deploy-smart-contracts
4. use-thirdweb-to-deploy-smart-contracts

**Pages**:
- **index.mdx** - Deployment tools overview (asIndexPage: true)
- **use-foundry-to-deploy-smart-contracts.mdx** - Foundry deployment guide
- **use-hardhat-to-deploy-smart-contracts.mdx** - Hardhat configuration and deployment
- **use-remix-to-deploy-smart-contracts.mdx** - Remix IDE deployment
- **use-thirdweb-to-deploy-smart-contracts.mdx** - Thirdweb platform deployment

#### 4B3: How to Use Mantle SDK
**Path**: `content/for-developers/how-to-guides/how-to-use-mantle-sdk/`
**_meta.js**:
1. bridging-erc-20-tokens-with-the-mantle-sdk
2. bridging-erc-721-tokens-with-the-mantle-sdk
3. bridging-eth-with-the-mantle-sdk
4. bridging-mnt-with-the-mantle-sdk

**Pages**:
- **index.mdx** - SDK overview (asIndexPage: true)
- **bridging-eth-with-the-mantle-sdk.mdx** - ETH bridging via SDK
- **bridging-mnt-with-the-mantle-sdk.mdx** - MNT token bridging
- **bridging-erc-20-tokens-with-the-mantle-sdk.mdx** - ERC-20 token bridging
- **bridging-erc-721-tokens-with-the-mantle-sdk.mdx** - NFT bridging

#### 4B4: How to Use Mantle Viem
**Path**: `content/for-developers/how-to-guides/how-to-use-mantle-viem/`
**_meta.js**:
1. bridging-erc-20-with-mantle-viem
2. bridging-eth-with-mantle-viem
3. bridging-mnt-with-mantle-viem

**Pages**:
- **index.mdx** - Viem library overview (asIndexPage: true)
- **bridging-eth-with-mantle-viem.mdx** - ETH bridging with Viem
- **bridging-mnt-with-mantle-viem.mdx** - MNT token bridging with Viem
- **bridging-erc-20-with-mantle-viem.mdx** - ERC-20 bridging with Viem

#### 4B5: How to Verify Smart Contracts
**Path**: `content/for-developers/how-to-guides/how-to-verify-smart-contracts/`
**_meta.js**:
1. use-explorer-to-verify-smart-contracts
2. use-foundry-to-verify-smart-contracts
3. use-hardhat-to-verify-smart-contracts

**Pages**:
- **index.mdx** - Verification overview (asIndexPage: true)
- **use-explorer-to-verify-smart-contracts.mdx** - Mantlescan explorer verification
- **use-foundry-to-verify-smart-contracts.mdx** - Foundry verification
- **use-hardhat-to-verify-smart-contracts.mdx** - Hardhat verification

### Subsection 4C: Resources & Tooling
**Path**: `content/for-developers/resources-and-tooling/`
**_meta.js** navigation:
1. account-abstraction - "Account Abstraction"
2. development-framework - "Development Framework"
3. indexing - "Indexing"
4. mantle-api - "Mantle API"
5. monitoring - "Monitoring"
6. node-endpoints-and-providers - "Node Endpoints and Providers"
7. oracles - "Oracles"
8. wallet - "Wallet"

**Root Pages**:
- **index.mdx** - Resources overview (asIndexPage: true)
- **node-endpoints-and-providers.mdx** - RPC endpoints, WebSocket URLs, third-party providers
- **mantle-api.mdx** - JSON-RPC API reference (Ethereum compatible)
- **oracles.mdx** - Price feeds, random numbers, external data sources
- **monitoring.mdx** - Block explorers (Mantlescan), transaction tracking
- **indexing.mdx** - Graph subgraphs, The Graph Studio, custom indexing
- **development-framework.mdx** - Mantle SDK, Mantle Viem, Hardhat, Foundry, etc.

#### 4C1: Account Abstraction
**Path**: `content/for-developers/resources-and-tooling/account-abstraction/`
**_meta.js**:
1. create-a-smart-account-by-using-etherspot
2. how-to-send-gasless-transaction-by-using-biconomy
3. social-login-by-using-particle

**Pages**:
- **index.mdx** - AA overview with Biconomy, Etherspot, Particle info (asIndexPage: true)
- **how-to-send-gasless-transaction-by-using-biconomy.mdx** - Biconomy SDK for gasless transactions
- **create-a-smart-account-by-using-etherspot.mdx** - Etherspot smart account creation
- **social-login-by-using-particle.mdx** - Particle social login integration

#### 4C2: Wallet
**Path**: `content/for-developers/resources-and-tooling/wallet/`
**_meta.js**:
1. multisig-wallet - "Multisig Wallet"
2. reown - "Reown"

**Pages**:
- **index.mdx** - Wallet overview (asIndexPage: true)
- **multisig-wallet.mdx** - Multi-signature wallet solutions
- **reown.mdx** - Reown (formerly WalletConnect) integration

---

## 5. FOR NODE OPERATORS SECTION
**Path**: `content/for-node-operators/`
**Navigation**: for-node-operators/_meta.js
**MDX Files**: ~20 files

### Navigation Structure (for-node-operators/_meta.js):
1. deployment-guides - "Deployment Guides"
2. faqs - "FAQs"
3. network-roles - "Network Roles"
4. network-updates - "Network Updates"
5. [separator]
6. status ↗
7. explorer ↗

### Root Pages:
- **network-roles.mdx** - Verifier nodes, Sequencer nodes (closed), node types
- **faqs.mdx** - Testnet state size, Foundry installation issues

### Subsection 5A: Deployment Guides
**Path**: `content/for-node-operators/deployment-guides/`
**_meta.js** navigation:
1. mainnet-v1.4.2 - "Mainnet (v1.4.2)"
2. testnet-v1.5.3 - "Testnet (v1.5.3)"

**Root Page**:
- **index.mdx** - Deployment guides overview (asIndexPage: true)

#### 5A1: Mainnet v1.4.2
**Path**: `content/for-node-operators/deployment-guides/mainnet-v1.4.2/`
**_meta.js**:
1. deploying-a-rollup-verifier-replica-node-from-binary
2. deploying-a-rollup-verifier-replica-node-from-docker

**Pages**:
- **index.mdx** - Mainnet guides overview (asIndexPage: true)
- **deploying-a-rollup-verifier-replica-node-from-docker.mdx** - Docker-based node deployment
- **deploying-a-rollup-verifier-replica-node-from-binary.mdx** - Binary-based node deployment

#### 5A2: Testnet v1.5.3
**Path**: `content/for-node-operators/deployment-guides/testnet-v1.5.3/`
**_meta.js**:
1. deploying-a-sepolia-rollup-verifier-replica-node-from-docker

**Pages**:
- **index.mdx** - Testnet guides overview (asIndexPage: true)
- **deploying-a-sepolia-rollup-verifier-replica-node-from-docker.mdx** - Sepolia testnet Docker deployment

### Subsection 5B: Network Updates
**Path**: `content/for-node-operators/network-updates/`
**_meta.js** navigation:
1. changelogs - "Changelogs"

**Root Page**:
- **index.mdx** - Network updates overview (asIndexPage: true)

#### 5B1: Changelogs
**Path**: `content/for-node-operators/network-updates/changelogs/`
**_meta.js** navigation (14 versions):
1. mantle-v2-v0.5.0
2. mantle-v2-v1.0.0
3. mantle-v2-v1.0.1
4. mantle-v2-v1.0.2
5. mantle-v2-v1.1.0
6. mantle-v2-v1.1.1-everest-upgrade
7. mantle-v2-v1.3.0-skadi-upgrade-sepolia
8. mantle-v2-v1.3.1-skadi-upgrade
9. mantle-v2-v1.3.2-skadi-upgrade
10. mantle-v2-v1.4.1-limb-upgrade-sepolia
11. mantle-v2-v1.4.2-limb-upgrade
12. mantle-v2-v1.5.3-arsia-upgrade-sepolia
13. mantle-v2-v1.5.4-arsia-mainnet

**Pages**:
- **index.mdx** - Changelogs overview (asIndexPage: true)
- **mantle-v2-v0.5.0.mdx** - v0.5.0 changelog
- **mantle-v2-v1.0.0.mdx** - v1.0.0 changelog
- **mantle-v2-v1.0.1.mdx** - v1.0.1 changelog
- **mantle-v2-v1.0.2.mdx** - v1.0.2 changelog
- **mantle-v2-v1.1.0.mdx** - v1.1.0 changelog
- **mantle-v2-v1.1.1-everest-upgrade.mdx** - Everest upgrade changelog
- **mantle-v2-v1.3.0-skadi-upgrade-sepolia.mdx** - Skadi v1.3.0 (Sepolia)
- **mantle-v2-v1.3.1-skadi-upgrade.mdx** - Skadi v1.3.1
- **mantle-v2-v1.3.2-skadi-upgrade.mdx** - Skadi v1.3.2
- **mantle-v2-v1.4.1-limb-upgrade-sepolia.mdx** - Limb v1.4.1 (Sepolia)
- **mantle-v2-v1.4.2-limb-upgrade.mdx** - Limb v1.4.2 (Mainnet)
- **mantle-v2-v1.5.3-arsia-upgrade-sepolia.mdx** - Arsia v1.5.3 (Sepolia)
- **mantle-v2-v1.5.4-arsia-mainnet.mdx** - Arsia v1.5.4 (Mainnet)

---

## 6. NOTICES SECTION
**Path**: `content/notices/`
**Navigation**: notices/_meta.js
**MDX Files**: 8 files

### Navigation Structure (notices/_meta.js):
1. arsia-mainnet-activation - "Arsia Mainnet Activation (April 22, 2026)"
2. arsia-upgrade-mantles-new-fee-model-and-op-stack-alignment - "Arsia Upgrade: Mantle's New Fee Model and OP Stack Alignment"
3. migration-of-data-availability-to-ethereum-blobs - "Migration of Data Availability to Ethereum Blobs"
4. limb-upgrade-ensuring-mantles-compatibility-with-fusaka - "Limb Upgrade: Ensuring Mantle's Compatibility with Fusaka"
5. mantle-op-succinct-mainnet-upgrade-and-withdrawal-period-transition - "Mantle OP Succinct Mainnet Upgrade & Withdrawal Period Transition"
6. mantle-network-mainnet-v2-everest-upgrade - "Mantle Network Mainnet v2 Everest Upgrade"
7. eigenda-migration-for-mantle-sepolia - "EigenDA Migration for Mantle Sepolia"
8. mantle-network-mainnet-v2-tectonic-upgrade-guide - "Mantle Network Mainnet v2 Tectonic Upgrade Guide"

**Pages**:
- **arsia-mainnet-activation.mdx** - Arsia mainnet activation (April 22, 2026, 07:00 UTC)
- **arsia-upgrade-mantles-new-fee-model-and-op-stack-alignment.mdx** - Arsia features and OP Stack alignment
- **migration-of-data-availability-to-ethereum-blobs.mdx** - DA migration to EIP-4844 blobs
- **limb-upgrade-ensuring-mantles-compatibility-with-fusaka.mdx** - Limb upgrade compatibility
- **mantle-op-succinct-mainnet-upgrade-and-withdrawal-period-transition.mdx** - OP Succinct upgrade
- **mantle-network-mainnet-v2-everest-upgrade.mdx** - Everest upgrade
- **eigenda-migration-for-mantle-sepolia.mdx** - EigenDA to Ethereum blobs migration
- **mantle-network-mainnet-v2-tectonic-upgrade-guide.mdx** - Tectonic upgrade guide

---

## 7. MORE SECTION
**Path**: `content/more/`
**Navigation**: more/_meta.js
**MDX Files**: 3 files

### Navigation Structure (more/_meta.js):
1. audits - "Audits"
2. faqs - "FAQs"
3. glossary - "Glossary"

**Pages**:
- **audits.mdx** - Security audit reports (Secure3, OpenZeppelin, Trail of Bits)
- **faqs.mdx** - General FAQs (signature algorithm, block gas limit, block time)
- **glossary.mdx** - Terminology definitions (Batcher, Bridge, Channel, etc.)

---

## DIRECTORY TREE SUMMARY

```
content/
├── index.mdx (Home - searchable: false)
├── _meta.js (Root navigation)
│
├── introduction/
│   ├── _meta.js
│   ├── overviews.mdx
│   ├── whats-new-in-mantle-v2-arsia.mdx
│   └── features/
│       ├── _meta.js
│       ├── custom-gas-token.mdx
│       ├── preconfirmations.mdx
│       ├── zk-validity-proofs.mdx
│       ├── three-component-fee-model.mdx
│       ├── dynamic-eip1559.mdx
│       └── metatx-gasless-transactions.mdx
│
├── system-information/
│   ├── _meta.js
│   ├── architecture.mdx
│   ├── roadmap.mdx
│   ├── transaction-lifecycle.mdx
│   ├── fee-mechanism/
│   │   ├── _meta.js
│   │   ├── index.mdx
│   │   ├── eip-1559-support.mdx
│   │   ├── estimate-fees.mdx
│   │   ├── fee-model-handbook-after-arsia.mdx
│   │   └── native-token-migration.mdx
│   ├── off-chain-system/
│   │   ├── _meta.js
│   │   ├── index.mdx
│   │   ├── contract-introduction.mdx
│   │   ├── node-introduction.mdx
│   │   ├── key-l2-contract-address.mdx
│   │   └── sp1-zkvm/
│   │       ├── _meta.js
│   │       ├── index.mdx
│   │       ├── introduction.mdx
│   │       └── sp1-workflow.mdx
│   ├── on-chain-system/
│   │   ├── _meta.js
│   │   ├── index.mdx
│   │   ├── contract-introduction.mdx
│   │   └── key-l1-contract-address.mdx
│   └── risk-management/
│       ├── _meta.js
│       ├── index.mdx
│       ├── zk-validity-proof.mdx
│       └── forced-transaction-inclusion.mdx
│
├── for-users/
│   ├── _meta.js
│   ├── faqs.mdx
│   ├── ecosystem/
│   │   ├── _meta.js
│   │   ├── index.mdx
│   │   └── supported-wallets.mdx
│   └── how-to-guides/
│       ├── _meta.js
│       ├── index.mdx
│       ├── connecting-wallet-to-mantle-network.mdx
│       ├── fetching-test-tokens.mdx
│       └── using-mantle-bridge.mdx
│
├── for-developers/
│   ├── _meta.js
│   ├── quick-access.mdx
│   ├── faqs.mdx
│   ├── optimize-your-transaction-fees.mdx
│   ├── the-differences-between-mantle-op-stack-and-ethereum.mdx
│   ├── troubleshooting.mdx
│   ├── common-use-cases/
│   │   ├── _meta.js
│   │   ├── index.mdx
│   │   ├── adding-a-custom-bridge-to-mantle.mdx
│   │   ├── adding-mantle-to-a-cex.mdx
│   │   ├── adding-mantle-wallet-support.mdx
│   │   └── moving-assets-and-data.mdx
│   ├── how-to-guides/
│   │   ├── _meta.js
│   │   ├── index.mdx
│   │   ├── how-to-bridge-your-assets/
│   │   │   ├── _meta.js
│   │   │   ├── index.mdx
│   │   │   ├── bridging-your-standard-erc-20-token-using-the-standard-bridge.mdx
│   │   │   └── bridging-your-custom-erc-20-token-using-the-standard-bridge.mdx
│   │   ├── how-to-deploy-smart-contracts/
│   │   │   ├── _meta.js
│   │   │   ├── index.mdx
│   │   │   ├── use-foundry-to-deploy-smart-contracts.mdx
│   │   │   ├── use-hardhat-to-deploy-smart-contracts.mdx
│   │   │   ├── use-remix-to-deploy-smart-contracts.mdx
│   │   │   └── use-thirdweb-to-deploy-smart-contracts.mdx
│   │   ├── how-to-use-mantle-sdk/
│   │   │   ├── _meta.js
│   │   │   ├── index.mdx
│   │   │   ├── bridging-eth-with-the-mantle-sdk.mdx
│   │   │   ├── bridging-mnt-with-the-mantle-sdk.mdx
│   │   │   ├── bridging-erc-20-tokens-with-the-mantle-sdk.mdx
│   │   │   └── bridging-erc-721-tokens-with-the-mantle-sdk.mdx
│   │   ├── how-to-use-mantle-viem/
│   │   │   ├── _meta.js
│   │   │   ├── index.mdx
│   │   │   ├── bridging-eth-with-mantle-viem.mdx
│   │   │   ├── bridging-mnt-with-mantle-viem.mdx
│   │   │   └── bridging-erc-20-with-mantle-viem.mdx
│   │   └── how-to-verify-smart-contracts/
│   │       ├── _meta.js
│   │       ├── index.mdx
│   │       ├── use-explorer-to-verify-smart-contracts.mdx
│   │       ├── use-foundry-to-verify-smart-contracts.mdx
│   │       └── use-hardhat-to-verify-smart-contracts.mdx
│   └── resources-and-tooling/
│       ├── _meta.js
│       ├── index.mdx
│       ├── node-endpoints-and-providers.mdx
│       ├── mantle-api.mdx
│       ├── oracles.mdx
│       ├── monitoring.mdx
│       ├── indexing.mdx
│       ├── development-framework.mdx
│       ├── account-abstraction/
│       │   ├── _meta.js
│       │   ├── index.mdx
│       │   ├── how-to-send-gasless-transaction-by-using-biconomy.mdx
│       │   ├── create-a-smart-account-by-using-etherspot.mdx
│       │   └── social-login-by-using-particle.mdx
│       └── wallet/
│           ├── _meta.js
│           ├── index.mdx
│           ├── multisig-wallet.mdx
│           └── reown.mdx
│
├── for-node-operators/
│   ├── _meta.js
│   ├── network-roles.mdx
│   ├── faqs.mdx
│   ├── deployment-guides/
│   │   ├── _meta.js
│   │   ├── index.mdx
│   │   ├── mainnet-v1.4.2/
│   │   │   ├── _meta.js
│   │   │   ├── index.mdx
│   │   │   ├── deploying-a-rollup-verifier-replica-node-from-docker.mdx
│   │   │   └── deploying-a-rollup-verifier-replica-node-from-binary.mdx
│   │   └── testnet-v1.5.3/
│   │       ├── _meta.js
│   │       ├── index.mdx
│   │       └── deploying-a-sepolia-rollup-verifier-replica-node-from-docker.mdx
│   └── network-updates/
│       ├── _meta.js
│       ├── index.mdx
│       └── changelogs/
│           ├── _meta.js
│           ├── index.mdx
│           ├── mantle-v2-v0.5.0.mdx
│           ├── mantle-v2-v1.0.0.mdx
│           ├── mantle-v2-v1.0.1.mdx
│           ├── mantle-v2-v1.0.2.mdx
│           ├── mantle-v2-v1.1.0.mdx
│           ├── mantle-v2-v1.1.1-everest-upgrade.mdx
│           ├── mantle-v2-v1.3.0-skadi-upgrade-sepolia.mdx
│           ├── mantle-v2-v1.3.1-skadi-upgrade.mdx
│           ├── mantle-v2-v1.3.2-skadi-upgrade.mdx
│           ├── mantle-v2-v1.4.1-limb-upgrade-sepolia.mdx
│           ├── mantle-v2-v1.4.2-limb-upgrade.mdx
│           ├── mantle-v2-v1.5.3-arsia-upgrade-sepolia.mdx
│           └── mantle-v2-v1.5.4-arsia-mainnet.mdx
│
├── notices/
│   ├── _meta.js
│   ├── arsia-mainnet-activation.mdx
│   ├── arsia-upgrade-mantles-new-fee-model-and-op-stack-alignment.mdx
│   ├── migration-of-data-availability-to-ethereum-blobs.mdx
│   ├── limb-upgrade-ensuring-mantles-compatibility-with-fusaka.mdx
│   ├── mantle-op-succinct-mainnet-upgrade-and-withdrawal-period-transition.mdx
│   ├── mantle-network-mainnet-v2-everest-upgrade.mdx
│   ├── eigenda-migration-for-mantle-sepolia.mdx
│   └── mantle-network-mainnet-v2-tectonic-upgrade-guide.mdx
│
└── more/
    ├── _meta.js
    ├── audits.mdx
    ├── faqs.mdx
    └── glossary.mdx
```

---

## KEY OBSERVATIONS

### Navigation Patterns
1. **Index Pages**: Many subdirectories have `index.mdx` with `asIndexPage: true` that contain links to child pages
2. **_meta.js Files**: Control sidebar ordering and navigation structure, support external links with `↗` suffix
3. **Separators**: Used in _meta.js files to visually group related items (external links separated with "---")

### Content Organization
- **Feature-focused**: Documentation organized by user personas (Users, Developers, Node Operators)
- **Version tracking**: Changelogs organized by network version (v0.5.0 → v1.5.4)
- **Upgrade tracking**: Notices section highlights major upgrades (Arsia, Limb, Skadi, Everest)
- **Modular architecture**: Clear separation of concerns (on-chain vs off-chain, L1 vs L2)

### Critical Sections
- **System Information**: Most comprehensive (architecture, fees, risks, on/off-chain components)
- **Developer Resources**: Largest section with multiple how-to guides and tooling references
- **Deployment Guides**: Version-specific (mainnet v1.4.2, testnet v1.5.3)
- **Notices**: Important announcements about network upgrades and migrations

### Recent Changes (Arsia Upgrade Focus)
Multiple pages emphasize the April 22, 2026 Arsia mainnet activation:
- New fee model (3-component: L2Execution + L1Data + OperatorFee)
- ZK validity proofs (SP1 zkVM)
- OP Stack alignment (Canyon → Jovian)
- Dynamic EIP-1559 with DA awareness

