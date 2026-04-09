---
title: "Mantle v2 {{VERSION}} - {{CODENAME}} Upgrade (Mainnet)"
---

# Mantle v2 {{VERSION}} - {{CODENAME}} Upgrade (Mainnet)

{{INTRO_DESCRIPTION}}

{{CODENAME}} is scheduled to activate on Mantle Mainnet at L2 block timestamp **{{L2_TIMESTAMP}}** ({{ACTIVATION_DATE_HUMAN}}).

<Callout type="warning">
**All Mantle Mainnet node operators must upgrade to this release before the activation time.**
</Callout>

## Upgrade from {{PREV_MAINNET_VERSION}} ({{PREV_CODENAME}})

If you are upgrading from {{PREV_MAINNET_VERSION}} (the current mainnet release), the {{CODENAME}} upgrade includes all changes from both {{SEPOLIA_VERSION}} and {{VERSION}}. See the [{{SEPOLIA_VERSION}} changelog](/node-operators/mantle-v2-{{SEPOLIA_VERSION_SLUG}}-{{CODENAME_SLUG}}-upgrade-sepolia) for the full {{CODENAME}} feature set.

## What's New in {{VERSION}} (vs {{SEPOLIA_VERSION}})

### mantle-v2

<!-- Fill delta changes between sepolia release and this mainnet release -->

{{MANTLE_V2_DELTA_CHANGES}}

### op-geth

<!-- Fill delta changes between sepolia release and this mainnet release -->

{{OP_GETH_DELTA_CHANGES}}

## Docker Images

| Component | Image |
|---|---|
| op-node | `mantlenetworkio/mantle-op-node:{{VERSION}}` |
| op-geth | `mantlenetworkio/mantle-op-geth:{{VERSION}}` |

## Full {{CODENAME}} Feature Summary ({{PREV_MAINNET_VERSION}} -> {{VERSION}})

For operators upgrading from {{PREV_MAINNET_VERSION}} ({{PREV_CODENAME}}), here is the complete list of {{CODENAME}} features:

<!-- Compile from sepolia changelog + this release's delta -->

{{FULL_FEATURE_SUMMARY}}

## Upgrade Instructions

Update your node software to {{VERSION}} before the mainnet activation time ({{ACTIVATION_DATE_SHORT}}):

1. Pull the latest Docker images:
   ```bash
   docker pull mantlenetworkio/mantle-op-node:{{VERSION}}
   docker pull mantlenetworkio/mantle-op-geth:{{VERSION}}
   ```

2. Follow the [mainnet deployment guide](/node-operators/deploy-from-docker) with the updated images.

3. Verify your node is running on {{VERSION}} and has synced past the activation block.

For detailed deployment steps, see the [Deployment Guides](/node-operators/tutorials).
