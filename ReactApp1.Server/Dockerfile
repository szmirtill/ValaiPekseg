FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# M�sold �t a projekt f�jlokat
COPY . .

# �ll�tsd vissza a f�gg�s�geket �s �p�tsd fel a projektet
RUN dotnet restore
RUN dotnet build -c Release -o /app/build

# Publik�ld az alkalmaz�st
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

# V�gs� image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "ReactApp1.Server.dll"]
