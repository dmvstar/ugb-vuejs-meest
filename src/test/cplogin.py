#!/bin/python3

from PyQt5 import QtWidgets
from PyQt5 import QtGui 
from PyQt5 import QtCore 
import os

# from mainwindow import Ui_MainWindow

class Login(QtWidgets.QDialog):
    def __init__(self, parent=None):
        super(Login, self).__init__(parent)
        title = "Login CheckPoint"
        width = 300;height = 200
        self.setWindowTitle(title) 
        self.setWindowIcon(QtGui.QIcon('face-cool.png')) 
        self.setMinimumSize(width, height) 

        self.textName = QtWidgets.QLineEdit(self)
        self.textCode = QtWidgets.QLineEdit(self)
        self.textPass = QtWidgets.QLineEdit(self)
        self.buttonLogin = QtWidgets.QPushButton('Login', self)
        self.buttonLogin.clicked.connect(self.handleLogin)
        self.buttonLogout = QtWidgets.QPushButton('Logout', self)
        self.buttonLogout.clicked.connect(self.handleLogout)
        layout = QtWidgets.QVBoxLayout(self)
        layout.addWidget(self.textName)
        layout.addWidget(self.textCode)
        layout.addWidget(self.textPass)
        layout.addWidget(self.buttonLogout)
        layout.addWidget(self.buttonLogin)
        self.textName.setText('dstarzhynskyi')
        self.textCode.setText('3264')
        self.textPass.setText('')
        self.textPass.setFocus()
        self.cmd = ""
        programname = os.path.basename(__file__)
        print(programname)
        programbase, ext = os.path.splitext(programname)  # extract basename and ext from filename
        settings = QtCore.QSettings("company", programbase) 
        self.textName.setText(str(settings.value("textName")))  # restore lineEditFile
        self.textCode.setText(str(settings.value("textCode")))  # restore lineEditFile

        #str = "this is string example....wow!!!";
        #print("Length of the string: ", len(str))
        #print("Length of the string: ", len( self.textPass.text() ))

    def handleLogin(self):
        #QtWidgets.QMessageBox.warning(
        #        self, 'Error', 'Text '+self.textPass.text()[0])
        
        #if (self.textName.text() == 'foo' and
        #    self.textPass.text() == 'bar'):
        if (len( self.textPass.text() ) == 6):
            name = self.textName.text()
            code = self.textCode.text()
            pins = self.textPass.text()
            self.cmd = 'echo '+ code + pins + '| snx -g -s 91.208.198.207 -u '+ name
            
            output = subprocess.getoutput( self.cmd )
            print(output)
            #Another session of SNX is already running, aborting...
            if output.find("Another")>=0:
                QtWidgets.QMessageBox.warning(
                        self, 'Warning', output)               
            #SNX: Access denied - wrong user name or password
            if output.find("Access denied")>=0:
                QtWidgets.QMessageBox.warning(
                        self, 'Error', output)      
            #SNX - connected.
            if output.find("connected")>=0:
                QtWidgets.QMessageBox.warning(
                        self, 'Info', output) 
            programname = os.path.basename(__file__)
            programbase, ext = os.path.splitext(programname)  # extract basename and ext from filename
            settings = QtCore.QSettings("company", programbase)    
            settings.setValue("geometry", self.saveGeometry())  # save window geometry
            #settings.setValue("state", self.saveState(UI_VERSION))   # save settings (UI_VERSION is a constant you should increment when your UI changes significantly to prevent attempts to restore an invalid state.)
            # save ui values, so they can be restored next time
            settings.setValue("textName", self.textName.text());
            settings.setValue("textCode", self.textCode.text());

            self.accept()
        else:
            QtWidgets.QMessageBox.warning(
                self, 'Error', 'Bad user or password '+self.textPass.text())    
    
    def handleLogout(self):
        #
        self.cmd = "snx -d"
        output = subprocess.getoutput( self.cmd )
        print(output)
        #Another session of SNX is already running, aborting...
        QtWidgets.QMessageBox.warning(
                    self, 'Info', output) 

class Window(QtWidgets.QMainWindow):
    def __init__(self, parent=None):
        super(Window, self).__init__(parent)
        # self.ui = Ui_MainWindow()
        # self.ui.setupUi(self)

if __name__ == '__main__':

    import sys
    import subprocess

    app = QtWidgets.QApplication(sys.argv)
    login = Login()    

    if login.exec_() == QtWidgets.QDialog.Accepted:
        #window = Window()
        #window.show()
        #sys.exit(app.exec_())
        str = 'Ok, '+ 'Execute snx ...'
        print(str)        
