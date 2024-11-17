# Maintenance Window Validator

`Maintenance Window Validator` is a custom GitHub Action that checks whether the current time falls within a specified maintenance window. This action is useful for workflows that need to ensure deployments or other time-sensitive tasks are executed only during predefined time periods.

---

## Features

- Validates whether the current time is within the specified maintenance window.
- Outputs a flag (`true` or `false`) indicating whether the workflow can proceed.
- Provides detailed logging for easy debugging.

---

## Inputs

| Input Name  | Description                                    | Required | Default |
|-------------|------------------------------------------------|----------|---------|
| `start_time` | Start of the maintenance window (24-hour format). | Yes      | `0`     |
| `end_time`   | End of the maintenance window (24-hour format).   | Yes      | `6`     |

---

## Outputs

| Output Name          | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| `is_within_time_range` | `true` if the current time is within the maintenance window, otherwise `false`. |

---

## Usage

### Workflow Example

```yaml
name: Maintenance Window Workflow

on:
  workflow_dispatch:
    inputs:
      start_time:
        description: "Enter the start time (24-hour format)."
        required: true
        default: "0"
      end_time:
        description: "Enter the end time (24-hour format)."
        required: true
        default: "6"

jobs:
  validate-maintenance:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Time Check Step
        id: time_check
        uses: mr-7v/test-customActions@main
        with:
          start_time: "${{ github.event.inputs.start_time }}"
          end_time: "${{ github.event.inputs.end_time }}"

      - name: Proceed if Time Check Passed
        if: steps.time_check.outputs.is_within_time_range == 'true'
        run: echo "Time check passed. Proceeding to deployment."

      - name: Skip Deployment if Time Check Failed
        if: steps.time_check.outputs.is_within_time_range == 'false'
        run: echo "Time check failed. Skipping deployment."
```

---

## Installation and Compilation (Contribution)

### Prerequisites

Ensure that you have the following installed:
- **Node.js**: Version 16 or higher.
- **GitHub CLI**: For testing and deploying workflows.

### Compiling the Action

Before pushing updates to the repository, you must compile the action using `@vercel/ncc` to bundle dependencies into a single file.

Run the following command to compile the `index.js` file:

```bash
npm run compile
```

This will:
- Generate a bundled file at `dist/index.js`.
- Include all dependencies (e.g., `@actions/core`).

### Important: Push the `dist/index.js` file

Make sure to commit and push the `dist/index.js` file to the repository. This is the file that GitHub Actions will use during execution.