import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

const ErrorMessage = ({ 
  message = 'Something went wrong. Please try again.', 
  onRetry = null,
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="ml-2">
          {message}
        </AlertDescription>
      </Alert>
      
      {onRetry && (
        <Button 
          variant="outline" 
          onClick={onRetry}
          className="mt-4"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  )
}

export default ErrorMessage

