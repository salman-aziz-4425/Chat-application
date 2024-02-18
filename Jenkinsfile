pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building the project...'
                // Add your build commands here
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                // Add your test commands here
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                // Add your deployment commands here
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline succeeded!'
            // Add any post-success actions here
        }
        failure {
            echo 'Pipeline failed!'
            // Add any post-failure actions here
        }
        always {
            echo 'Pipeline completed.'
            // Add any actions that should always execute here
        }
    }
}
