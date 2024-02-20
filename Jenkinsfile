pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'docker build -t nextjs-app .'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying my app...'
                // Add your deployment commands here
            }
        }
    }
    
}
