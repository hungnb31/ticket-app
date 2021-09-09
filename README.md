# Ticket App
Local development step:
- Install Docker, Kubernetes, Skaffold, Minikube
- Setup local domain to Minikube ip in host file
- Enable Ingress addon in Minikube
- Create k8s secret
  - kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<jwt_key>
  - kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<private_key>
- run "skaffold dev"
