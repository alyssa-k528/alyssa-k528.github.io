---
title: NETGEAR
date: Jan 2025 - Aug 2025
---
- Developed embedded Linux firmware and IoT functionality across three Orbi products, working with OpenWrt, MQTT, Bluetooth, and Matter over Thread/Wi-Fi.

- Implemented circular log collection, message ID allocation, and retry handling for a router analytics daemon that exchanges messages between device services and an MQTT broker. Used bitmaps and a circular queue to track and manage message IDs.

- Designed a request-tracking protocol to correlate device-service requests with MQTT responses using application-level message IDs and acknowledgments. Built a proof of concept for forwarding incoming requests to the MQTT broker.

- Implemented certificate scrambling and splitting, along with state checks for certificate provisioning, device registration, and reconnection using device-specific credentials.

- Built automated API and serial-console tests in Python with timeouts, retries, and per-attempt failure reports. Added JavaScript tests for serial communication and a GitHub CI/CD pipeline to run automated tests on pushes to main.

- Set up an OpenWrt-based Thread border router on Raspberry Pi, cross-compiled ARM64 executables from an x86-64 development environment, and ported a REST API server to OpenWrt, validating JSON requests with Postman.
