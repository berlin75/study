<?php
class ErrorTest extends PHPUnit_Framework_TestCase{
    /**
     * @expectedException PHPUnit_Framework_Error
     * @group exception
     */
    public function testFileWriting(){
        $this->assertFalse(file_put_contents('../is-not-writeable/file', 'stuff'));
    }
}