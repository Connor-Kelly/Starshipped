IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241124232256_InitialCreate'
)
BEGIN
    CREATE TABLE [Starships] (
        [Id] int NOT NULL IDENTITY,
        [URL] nvarchar(max) NOT NULL,
        [name] nvarchar(max) NULL,
        [Model] nvarchar(max) NULL,
        [Manufacturer] nvarchar(max) NULL,
        [CostInCredits] nvarchar(max) NULL,
        [Length] nvarchar(max) NULL,
        [MaxAtmosphericSpeed] nvarchar(max) NULL,
        [Crew] nvarchar(max) NULL,
        [Passengers] nvarchar(max) NULL,
        [CargoCapacity] nvarchar(max) NULL,
        [Consumables] nvarchar(max) NULL,
        [HyprdriveRating] nvarchar(max) NULL,
        [MGLT] nvarchar(max) NULL,
        [StarshipClass] nvarchar(max) NULL,
        [Films] nvarchar(max) NOT NULL,
        [Pilots] nvarchar(max) NOT NULL,
        [Created] nvarchar(max) NULL,
        [Edited] nvarchar(max) NULL,
        CONSTRAINT [PK_Starships] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241124232256_InitialCreate'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20241124232256_InitialCreate', N'9.0.0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241124234800_ComputedIDFromURL'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20241124234800_ComputedIDFromURL', N'9.0.0');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241124235203_ComputedIDFromURL2'
)
BEGIN
    ALTER TABLE [Starships] ADD [SwapiID] int NOT NULL DEFAULT 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241124235203_ComputedIDFromURL2'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20241124235203_ComputedIDFromURL2', N'9.0.0');
END;

COMMIT;
GO

