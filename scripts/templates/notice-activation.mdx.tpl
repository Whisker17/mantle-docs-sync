---
title: "{{CODENAME}} Upgrade Mainnet Activation"
---

# {{CODENAME}} Upgrade Mainnet Activation

<Callout type="warning">
**Action required for all Mantle Mainnet node operators.** Upgrade to {{VERSION}} before {{ACTIVATION_DATE_SHORT}}.
</Callout>

## Overview

The **{{CODENAME}} Upgrade** is now scheduled for **Mantle Mainnet** activation at L2 block timestamp **{{L2_TIMESTAMP}}** ({{ACTIVATION_DATE_HUMAN}}).

{{CODENAME}} was previously activated on Mantle Sepolia ({{SEPOLIA_VERSION}}, {{SEPOLIA_DATE}}). The mainnet release ({{VERSION}}) includes all {{CODENAME}} features plus audit-driven fixes identified during the Sepolia testing period.

## What's Included

<!-- High-level feature categories with brief explanations -->

{{FEATURE_SECTIONS}}

### Security

{{SECURITY_NOTES}}

## Required Actions

### For Node Operators

**You must upgrade to {{VERSION}} before {{ACTIVATION_DATE_SHORT}}.**

```bash
docker pull mantlenetworkio/mantle-op-node:{{VERSION}}
docker pull mantlenetworkio/mantle-op-geth:{{VERSION}}
```

See the [{{VERSION}} changelog](/node-operators/mantle-v2-{{VERSION_SLUG}}-{{CODENAME_SLUG}}-mainnet) for full upgrade instructions.

### For Developers

{{DEVELOPER_ACTIONS}}

### For Users

{{USER_IMPACT}}

## Timeline

| Date | Event |
|---|---|
| {{SEPOLIA_DATE}} | {{CODENAME}} activated on Sepolia ({{SEPOLIA_VERSION}}) |
| {{RELEASE_DATE}} | {{VERSION}} Mainnet release published |
| **{{ACTIVATION_DATE_SHORT}}** | **{{CODENAME}} activates on Mainnet** |

## Resources

* [{{VERSION}} Changelog](/node-operators/mantle-v2-{{VERSION_SLUG}}-{{CODENAME_SLUG}}-mainnet)
* [{{SEPOLIA_VERSION}} Changelog (Sepolia)](/node-operators/mantle-v2-{{SEPOLIA_VERSION_SLUG}}-{{CODENAME_SLUG}}-upgrade-sepolia)
* [GitHub: mantle-v2 {{VERSION}}](https://github.com/mantlenetworkio/mantle-v2/releases/tag/{{VERSION}})
* [GitHub: op-geth {{VERSION}}](https://github.com/mantlenetworkio/op-geth/releases/tag/{{VERSION}})
