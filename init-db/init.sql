DO $$ BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'loan_application_processing_service') THEN
        CREATE DATABASE loan_application_processing_service;
    END IF;
END $$;
