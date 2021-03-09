import subprocess

pin = "3264"
code = "123456"

cmd = "echo "+pin+code
output = subprocess.getoutput( cmd )
print(output)

#cmd = "snx -g -s 91.208.198.207 -u dstarzhynskyi"
#output = subprocess.getoutput( cmd )
#print(output)
