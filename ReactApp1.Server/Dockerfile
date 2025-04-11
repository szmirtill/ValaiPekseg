FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Másold át a projekt fájlokat
COPY . .

# Állítsd vissza a függõségeket és építsd fel a projektet
RUN dotnet restore
RUN dotnet build -c Release -o /app/build

# Publikáld az alkalmazást
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

# Végsõ image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "ReactApp1.Server.dll"]
