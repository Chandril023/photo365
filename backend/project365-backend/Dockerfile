# Use official OpenJDK 17 as the base image
FROM openjdk:17-jdk-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Install Maven (necessary for building the project)
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# Copy the entire project into the container
COPY . /app

# Build the application using Maven
RUN mvn clean install -DskipTests

# Use a smaller JDK runtime for the final image
FROM openjdk:17-jdk-slim

# Set the working directory in the runtime image
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/project365-backend-0.0.1-SNAPSHOT.jar /app/

# Expose the port your application will run on
EXPOSE 8080

# Set the entry point to run the Spring Boot application
CMD ["java", "-jar", "project365-backend-0.0.1-SNAPSHOT.jar"]
