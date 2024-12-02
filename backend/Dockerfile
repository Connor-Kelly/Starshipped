# Use the official .NET SDK image for building the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy and restore project dependencies
COPY *.csproj .
RUN dotnet restore

# RUN dotnet tool install --global dotnet-ef

# Copy the rest of the application and build
COPY . .
RUN dotnet publish -c Release -o out

# Use the runtime image for running the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

ENV ASPNETCORE_URLS="http://*:5119"

# Expose port 5119
EXPOSE 5119
EXPOSE 8080

# RUN dotnet ef database update

# Run the application
ENTRYPOINT ["dotnet", "backend.dll"]
