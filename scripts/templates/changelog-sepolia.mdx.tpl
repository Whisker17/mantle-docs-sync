---
title: "Mantle v2 {{VERSION}} - {{CODENAME}} Upgrade (Sepolia)"
---

# Mantle v2 {{VERSION}} - {{CODENAME}} Upgrade (Sepolia)

{{INTRO_DESCRIPTION}}

{{CODENAME}} is scheduled to activate on Mantle Sepolia at L2 block timestamp **{{L2_TIMESTAMP}}** ({{ACTIVATION_DATE_HUMAN}}).

<Callout type="warning">
**All Mantle Sepolia node operators must upgrade to this release before the activation time.**
</Callout>

## Mantle v2

#### Change Log

<!-- Fill from submodule diff: repos/mantle-v2 -->

**All**

{{ALL_CHANGES}}

**op-node**

{{OP_NODE_CHANGES}}

**op-batcher**

{{OP_BATCHER_CHANGES}}

**Contracts**

{{CONTRACT_CHANGES}}

## op-geth

#### Change Log

<!-- Fill from submodule diff: repos/op-geth -->

{{OP_GETH_CHANGES}}

## Docker Images

| Component | Image |
|---|---|
| op-node | `mantlenetworkio/mantle-op-node:{{VERSION}}` |
| op-geth | `mantlenetworkio/mantle-op-geth:{{VERSION}}` |

## Upgrade Instructions

Update your node software to {{VERSION}} before the Sepolia activation time ({{ACTIVATION_DATE_SHORT}}):

1. Pull the latest Docker images:
   ```bash
   docker pull mantlenetworkio/mantle-op-node:{{VERSION}}
   docker pull mantlenetworkio/mantle-op-geth:{{VERSION}}
   ```

2. Follow the deployment guide with the updated images.

3. Verify your node is running on {{VERSION}} and has synced past the activation block.

For detailed deployment steps, see the [Deployment Guides](/node-operators/tutorials).
