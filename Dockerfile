FROM ruby:3.3.3
# Rails app lives here
WORKDIR /app

# Install packages needed to build gems
RUN apt-get update -qq && \
    apt-get install  -y \
    build-essential \
    git \
    g++ \
    libpq-dev \
    libvips \
    make \
    nodejs && \
    rm -rf /var/lib/apt/lists/*

# Install application gems
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD ["./bin/rails", "server", "-b", "0.0.0.0"]
