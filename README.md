# 🛒 E-Commerce Microservices Platform

A **modern microservices-based eCommerce system** built with **NestJS** (monorepo using Nx), featuring **CQRS, Event Sourcing, gRPC, NATS, Kafka-ready integration, and Elasticsearch-powered search**.

This project demonstrates how to design and scale a **modular, event-driven eCommerce backend**.

---

## ✨ Features

-   **Monorepo with Nx** – centralized dev & builds for all services
-   **NestJS Microservices** – each service runs independently
-   **CQRS + Event Sourcing** – clean separation of read/write and event replay
-   **NATS** – message broker for async communication
-   **EventStoreDB** – persistent event store for domain-driven design
-   **Prisma + MongoDB Atlas** – schema-driven persistence with transactions
-   **Elasticsearch + Kibana** – full-text search, analytics & monitoring
-   **Monstache** – sync MongoDB → Elasticsearch in real time
-   **gRPC & GraphQL** – inter-service comms + API gateway for clients
-   **Keycloak Integration** – auth, roles, and resource-based access control
-   **Scalable Architecture** – designed for load balancing and service discovery (Consul ready)

---

## 🏗️ Microservices

-   **API Gateway** – GraphQL interface, routes to domain services
-   **Catalog Service** – product CRUD, event sourcing, emits product events
-   **Search Service** – handles Elasticsearch queries & recommendations
-   **Order Service** – order lifecycle, integrates with payment & inventory
-   **User/Identity Service** – manages accounts, integrates with Keycloak
-   **Payment Service** – (Stripe-ready) payment intents & transactions
-   **Analytics Service** – tracks events like views, add-to-cart, conversions

---

## ⚙️ Tech Stack

-   **Framework**: [NestJS](https://nestjs.com/) + [Nx](https://nx.dev/)
-   **Databases**: [MongoDB Atlas](https://www.mongodb.com/atlas), [EventStoreDB](https://www.eventstore.com/)
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Search**: [Elasticsearch](https://www.elastic.co/elasticsearch/), [Kibana](https://www.elastic.co/kibana/)
-   **Sync**: [Monstache](https://rwynn.github.io/monstache-site/)
-   **Messaging**: [NATS](https://nats.io/), Kafka-ready
-   **API**: gRPC + GraphQL
-   **Auth**: [Keycloak](https://www.keycloak.org/) via `nest-keycloak-connect`
-   **Containerization**: Docker + Docker Compose
-   **Monitoring**: Kibana, scalable for Prometheus/Grafana
